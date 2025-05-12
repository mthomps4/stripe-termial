import { brandColors } from "@/constants/Colors";
import { useCurrentUser } from "@/contexts/CurrentUserProvider";
import { useLogin } from "@/hooks/auth/login";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const { user, setUser, setToken } = useCurrentUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSuccess = (data: any) => {
    setUser(data.user);
    setToken(data.token);
    router.replace("/(sweet-cuts)");
  };

  const onError = (err: any) => {
    console.error("error", { err });
  };

  const { mutate: login, isPending } = useLogin({
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (user) {
      router.replace("/(sweet-cuts)");
    }
  }, [user, router]);

  const handleSubmit = () => {
    setError("");
    login({ user: { email, password } });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/sweet_cuts.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text style={styles.buttonText}>
            {isPending ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: brandColors.sky[900],
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: brandColors.neutral[50],
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: brandColors.sky[900],
  },
  form: {
    width: "80%",
    maxWidth: 400,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: brandColors.sky[700],
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: brandColors.sky[50],
  },
  button: {
    backgroundColor: brandColors.sky[700],
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: brandColors.sky[50],
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: brandColors.sky[900],
    marginBottom: 10,
  },
});
