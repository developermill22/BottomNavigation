import { useState } from 'react';
import { Modal } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ExampleScreen from './ExampleScreen';

// Full-screen example for the style in `config`; pass null to close.
export default function ExampleModal({ config, onClose }) {
  // Keep showing the last style while the modal slides out.
  const [shown, setShown] = useState(config);
  if (config && config !== shown) setShown(config);

  return (
    <Modal
      visible={config != null}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      {/* Insets aren't inherited across the native modal boundary. */}
      <SafeAreaProvider>
        {shown ? <ExampleScreen key={shown.variant} config={shown} onClose={onClose} /> : null}
      </SafeAreaProvider>
    </Modal>
  );
}
