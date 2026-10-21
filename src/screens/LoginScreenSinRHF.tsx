import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect } from 'react';

type Errores = { email?: string; password?: string };

const LoginScreen = () => {
  useEffect(() => {
    console.log('Me renderizo');
  },[]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async () => {
    // validar a mano, campo por campo
    const nuevos: Errores = {};
    if (!email) nuevos.email = 'El email es obligatorio';
    if (password.length < 6) nuevos.password = 'Mínimo 6 caracteres';
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    // ... llamar al backend
    setEnviando(false);
  };

  return (
    <View style={styles.container}>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      {errores.email && <Text style={{ color: 'red' }}>{errores.email}</Text>}

      <TextInput value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />
      {errores.password && <Text style={{ color: 'red' }}>{errores.password}</Text>}

      <Button title="Entrar" onPress={onSubmit} disabled={enviando} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    padding: 16,
  }
})