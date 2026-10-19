# Patches

## `expo-modules-jsi+<version>.patch`

Two Xcode 26.2 (Swift 6.2.3) workarounds, both no-ops at runtime. Both make the
`Build ExpoModulesJSI xcframework` phase fail without them.

### 1. `RuntimeScheduler.h`

Removes `SWIFT_RETURNS_RETAINED` from the two `expo::RuntimeScheduler` constructors
in `RuntimeScheduler.h`.

**Why:** Swift's ClangImporter only accepts `returns_retained` on *constructors* of a
`SWIFT_SHARED_REFERENCE` type from Swift 6.3 (Xcode 26.4) onward. On Xcode 26.2 /
Swift 6.2.3 it fails the `Build ExpoModulesJSI xcframework` phase with:

```
'RuntimeScheduler' cannot be annotated with either SWIFT_RETURNS_RETAINED or
SWIFT_RETURNS_UNRETAINED because it is not returning a SWIFT_SHARED_REFERENCE type
```

The message is misleading — the type *is* imported as a shared reference. A free
function returning `RuntimeScheduler *` with the same annotation compiles fine on
this toolchain; only the constructor form is rejected.

**Why it is safe:** Swift 6.2 already imports these constructors as `+1`. Verified by
constructing the scheduler from Swift with the annotation removed and reading the
private `refCount`, which is `1` immediately after construction — exactly the
ownership the annotation declares. So the patch changes nothing at runtime here; the
annotation is only needed to satisfy newer toolchains that require it explicitly.

### 2. `JavaScriptRuntime.swift`

Re-declares the `nonisolated(unsafe) let thisPtr / argumentsPtr / resultPtr` bindings
inside the `withGuaranteedContext { ... }` closure of the host-object getter and both
`createFunctionClosure` trampolines.

**Why:** with that patch alone, the same build phase then fails with 7 errors like:

```
JavaScriptRuntime.swift:193:43: sending 'resultPtr' risks causing data races
```

The source already marks those pointers `nonisolated(unsafe)` in the outer function.
Swift 6.2's region-isolation pass drops that marking when the variable is captured
through one closure (`withGuaranteedContext`) before reaching the `@JavaScriptActor`
closure passed to `JavaScriptActor.assumeIsolated`. A standalone reproduction
compiled with the package's flags (`-swift-version 6`,
`-enable-upcoming-feature NonisolatedNonsendingByDefault`) showed:

- outer closure → `assumeIsolated` → inner closure: error
- no outer closure: compiles
- re-bind as `nonisolated(unsafe)` inside the outer closure: compiles
- re-bind inside the actor-isolated closure: still errors

Note that `-typecheck` doesn't show the error; you need a full compile (`-emit-library`).

**Why it is safe:** it only re-binds the same pointer values to a local constant.
Nothing about ownership, threading, or call order changes.

### Regenerating

`patch-package` diffs the whole package, including the xcframework build outputs, so
exclude them:

```
npx patch-package expo-modules-jsi --exclude '^package\.json$|/\.DerivedData/|/Products/|/\.generated/|/\.build/|/\.xcframework-slices/'
```

**Remove this patch when:** upgrading to Xcode 26.4+ (Swift 6.3+), which is the
toolchain Expo SDK 57 officially targets. Delete the patch file and run
`rm -rf node_modules/expo-modules-jsi/apple/Products` before rebuilding.
