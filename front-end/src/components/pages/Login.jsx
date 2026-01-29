import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import { Separator } from "../ui/separator";
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
    const { login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex items-center justify-center dark:from-primary/5 dark:via-secondary/5 dark:to-accent/5 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl mb-2 bg-linear-to-br from-blue-500 via-cyan-500 to-green-500 bg-clip-text text-transparent">
                        Bem-vindo de volta!
                    </h1>
                    <p className="text-muted-foreground">
                        Continue sua jornada de aprendizagem
                    </p>
                </div>

                <Card className="shadow-xl border-2">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl text-center">
                            Entrar
                        </CardTitle>
                        <CardDescription className="text-center">
                            Entre com seu email e senha para acessar sua conta
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Senha</Label>
                                    <button
                                        type="button"
                                        className="text-sm text-emerald-600 hover:underline"
                                        onClick={() =>
                                            alert("Funcionalidade de recuperação de senha")
                                        }
                                    >
                                        Esqueceu a senha?
                                    </button>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-emerald-500 hover:bg-emerald-400"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Entrando...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <LogIn className="w-4 h-4" />
                                        Entrar
                                    </div>
                                )}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <Separator />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                    Ou continue com
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" disabled className="w-full">
                                Google
                            </Button>
                            <Button variant="outline" disabled className="w-full">
                                Facebook
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4">
                        <Separator />
                        <div className="text-sm text-center text-muted-foreground">
                            Não tem uma conta?{" "}
                            <button
                                onClick={() => navigate("/cadastro")}
                                className="text-emerald-600 hover:underline"
                            >
                                Cadastre-se gratuitamente
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
