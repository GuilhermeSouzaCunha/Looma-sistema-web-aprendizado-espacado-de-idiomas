import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { Button } from "./ui/button";
import { BookOpen, Trophy, User, LayoutDashboard, Flame, LogOut } from "lucide-react";

export default function HeaderApp({ userPoints = 1250, streak = 7 }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = !!user;

    const currentPage = location.pathname.replace("/", "") || "dashboard";

    const handleNavigate = (path) => {
        navigate(`/${path}`);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() =>
                        handleNavigate(isLoggedIn ? "dashboard" : "login")
                    }
                >
                    <span className="font-semibold">Looma</span>
                </div>
                {/* Navegação */}
                {isLoggedIn ? (
                    <nav className="flex items-center gap-1 sm:gap-2">
                        <Button
                            variant={
                                currentPage === "dashboard" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => handleNavigate("dashboard")}
                            className="gap-2"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Button>

                        <Button
                            variant={
                                currentPage === "flashcards" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => handleNavigate("flashcards")}
                            className="gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Flashcards</span>
                        </Button>

                        <Button
                            variant={
                                currentPage === "atividades" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => handleNavigate("atividades")}
                            className="gap-2"
                        >
                            <Flame className="w-4 h-4" />
                            <span className="hidden sm:inline">Atividades</span>
                        </Button>

                        <Button
                            variant={
                                currentPage === "ranking" ? "default" : "ghost"
                            }
                            size="sm"
                            onClick={() => handleNavigate("ranking")}
                            className="gap-2"
                        >
                            <Trophy className="w-4 h-4" />
                            <span className="hidden sm:inline">Ranking</span>
                        </Button>
                    </nav>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button
                            variant={currentPage === "login" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleNavigate("login")}
                        >
                            Entrar
                        </Button>

                        <Button
                            variant={currentPage === "cadastro" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => handleNavigate("cadastro")}
                        >
                            Criar conta
                        </Button>
                    </div>
                )}

                <div className="flex items-center gap-2 sm:gap-4">
                    {isLoggedIn && (
                        <>
                            <div className="hidden sm:flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 rounded-lg">
                                    <Flame className="w-4 h-4 text-yellow-500" />
                                    <span className="text-sm">{streak}</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg">
                                    <Trophy className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm">{userPoints}</span>
                                </div>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleNavigate("perfil")}
                                className="rounded-lg"
                            >
                                <User className="w-5 h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                className="rounded-lg text-destructive hover:text-destructive"
                                title="Sair"
                            >
                                <LogOut className="w-5 h-5" />
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
