import {
  Paper,
  Grid,
  Text,
  Title,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Stack,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import {api} from '../../api/axios'
import { setTokens } from "../../store/authSlice";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import type { AxiosError } from "axios";
import { useMantineColorScheme } from '@mantine/core';
import logoLight from '../../assets/logoLight.svg'
import logoDark from '../../assets/logoDark.svg'

export const AuthLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const {t} = useTranslation()

    const dispatch = useAppDispatch();
    const navigate = useNavigate();



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
        const response = await api.post("/api/v1/auth/login", { username, password });
        console.log(response.data);
      
        const accessToken = response.data.authenticationToken;
        const refreshToken = response.data.refreshToken;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(setTokens({ accessToken, refreshToken }));
        navigate("/subjects/private-sector");
    } catch (err: unknown) {
        const error = err as AxiosError<{ message: string }>;
        console.error("Login failed", error);
        setError(error.response?.data?.message || "Ошибка авторизации");
        } finally {
        setLoading(false);
        }
    };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark ? "#0e1315" : "#f3f3f3",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container size="lg">
        <Paper
          radius="lg"
           p="xl"
          style={{
            background: isDark ? "#161d21" : "#fdfdfd",
            width: 1000,
            padding: "32px 16px 32px 16px",
          }}
        >
          <Grid align="center">

            <Grid.Col
              span={{ base: 12, md: 6 }}
              style={{
                width: 548,
                height: 428,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
              }}
            >

                <img
                  src={isDark ?   logoLight : logoDark}
                  alt="logo"
                  style={{ width: 200 }}
                />
     
              <Text
                size="md"
                c={isDark ? "white" : "dark"}
                style={{
                  textAlign: "center",
                  letterSpacing: "-0.2px",
                  lineHeight: 1.4,
                }}
              >
                Координационный центр по обеспечению кибербезопасности
                ГКНБ Кыргызской Республики
              </Text>

              <Text
                size="md"
                c={isDark ? "white" : "dark"}
                style={{
                  textAlign: "center",
                  letterSpacing: "-0.2px",
                  lineHeight: 1.4,
                }}
              >
                Кыргыз Республикасынын Улуттук коопсуздук мамлекеттик
                комитетинин Киберкоопсуздукту камсыздоо боюнча координациялык
                борбор
              </Text>
            </Grid.Col>

          
            <Grid.Col
              span={{ base: 12, md: 6 }}
              style={{ width: 546, height: 416, padding: "32px 16px 32px 16px" }}
            >
              <Paper radius="md"  
                style={{
                    background: "transparent",
                }}>
                <Stack style={{ display: "flex", gap: 60 }}>
                  <Title order={2} ta="center"  c={isDark ? "white" : "dark"}>
                    Авторизация
                  </Title>

                  <form
                    onSubmit={handleLogin}
                    autoComplete="off"
                    style={{ display: "flex", flexDirection: "column", gap: 30 }}
                  >
                    <TextInput
                      label={username ? "Логин" : undefined}
                      placeholder={t("authorization.login")}
                      value={username}
                      autoComplete="off"
                      onChange={(e) => setUsername(e.currentTarget.value)}
                      required
                      styles={{
                        input: {
                            background: "transparent",
                            height: 48,
                            borderRadius: 16,
                            fontSize: 20,
                            padding: "0 15px",
                        },
                        label: { fontSize: 14, marginBottom: 4 },
                      }}
                    />

                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      label={password ? "Пароль" : undefined}
                      placeholder={t("authorization.password")}
                      autoComplete="new-password"
                      required
                      styles={{
                        input: {
                            background: "transparent",
                            height: 48,
                            borderRadius: 16,
                            fontSize: 20,
                            padding: "0 15px",
                        },
                        label: { color: "white", fontSize: 14, marginBottom: 4 },
                      }}
                      visibilityToggleIcon={({ reveal }) =>
                        reveal ? <IconEye size={24} /> : <IconEyeOff size={24}   />
                      }
                    />

                    {error && <Text c="red">{error}</Text>}

                    <Button
                      type="submit"
                      fullWidth
                      style={{
                        height: 44,
                        borderRadius: 16,
                        fontSize: 20,
                        backgroundColor: isDark ? "#ffffff" : "#000000",
                        color: isDark ? "#000000" : "#ffffff",
                      }}
                      disabled={loading}
                    >
                      {loading ? "Входим..." : "Войти"}
                    </Button>
                  </form>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};


