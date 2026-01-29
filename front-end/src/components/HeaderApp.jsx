import { Button } from "./ui/button";
import { BookOpen, Trophy, User, LayoutDashboard, Moon, Sun, Flame, LogOut } from "lucide-react";

export default function Header({ currentPage, onNavigate, user, onLogout, userPoints = 1250, streak = 7 }) {
    const isLoggedIn = currentPage !== 'home';

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'home')}
                >
                    <span className="font-semibold">
                        Looma
                    </span>
                </div>

                {/* Navegação */}
                {isLoggedIn ? (
                    <nav className="flex items-center gap-1 sm:gap-2">
                        <Button
                            variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onNavigate('dashboard')}
                            className="gap-2"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="hidden sm:inline">Dashboard</span>
                        </Button>
                        <Button
                            variant={currentPage === 'flashcards' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onNavigate('flashcards')}
                            className="gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            <span className="hidden sm:inline">Flashcards</span>
                        </Button>
                        <Button
                            variant={currentPage === 'activities' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onNavigate('atividades')}
                            className="gap-2"
                        >
                            <Flame className="w-4 h-4" />
                            <span className="hidden sm:inline">Atividades</span>
                        </Button>
                        <Button
                            variant={currentPage === 'ranking' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => onNavigate('ranking')}
                            className="gap-2"
                        >
                            <Trophy className="w-4 h-4" />
                            <span className="hidden sm:inline">Ranking</span>
                        </Button>
                    </nav>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onNavigate('login')}
                        >
                            Entrar
                        </Button>
                        <Button
                            size="sm"
                            className="bg-primary hover:bg-primary/90"
                            onClick={() => onNavigate('cadastro')}
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
                        </>
                    )}

                    {isLoggedIn && (
                        <>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onNavigate('perfil')}
                                className="rounded-lg"
                            >
                                <User className="w-5 h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onLogout}
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