import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { loginSchema } from '../schemas/login.schema';

// Generar un tipo a partir del esquema de validación
type LoginForm = z.infer<typeof loginSchema>;
const LoginScreenFull = () => {
  const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginForm>({
    resolver: zodResolver(loginSchema), //* Aqui donde se conecta RHF con Zod
    defaultValues: { email: '', password: '' },
    mode: 'onBlur' // Validar al perder el foco
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    //* Solo llego aqui si los datos son validos, es decir si Zod ya validó los datos y no hay errores
    console.log('Datos válidos del formulario:', data);
    // Aquí puedes hacer la llamada al backend con los datos validados
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { ref, onChange, onBlur, value } }) => (
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Email"
          />
        )}
      />
 
    </View>
  )
}

export default LoginScreenFull;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 8 },
  error: { color: 'red', marginBottom: 8 },
});