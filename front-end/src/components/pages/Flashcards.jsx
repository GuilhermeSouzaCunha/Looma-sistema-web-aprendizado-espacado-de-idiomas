import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { Volume2, RotateCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Clock
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallBack";

export default function Flashcards({ onNavigate }) {
    const [cartaoAtual, setCartaoAtual] = useState(0);
    const [estaVirado, setEstaVirado] = useState(false);
    const [respondidos, setRespondidos] = useState([]);

    const flashcards = [
        {
            palavra: "Apple",
            traducao: "Maçã",
            exemplo: "I eat an apple every day",
            exemploTraducao: "Eu como uma maçã todos os dias",
            fonetica: "/ˈæp.əl/",
            imagem: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
            proximaRevisao: "5 minutos",
            dificuldade: "Novo"
        },
        {
            palavra: "Beautiful",
            traducao: "Bonito(a)",
            exemplo: "What a beautiful day!",
            exemploTraducao: "Que dia bonito!",
            fonetica: "/ˈbjuː.tɪ.fəl/",
            imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400",
            proximaRevisao: "10 minutos",
            dificuldade: "Revisão"
        },
        {
            palavra: "Friend",
            traducao: "Amigo(a)",
            exemplo: "She is my best friend",
            exemploTraducao: "Ela é minha melhor amiga",
            fonetica: "/frend/",
            imagem: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400",
            proximaRevisao: "1 hora",
            dificuldade: "Fácil"
        }
    ];

    const cartao = flashcards[cartaoAtual];
    const progresso = ((cartaoAtual + 1) / flashcards.length) * 100;

    const dificuldadesValidas = ['novamente', 'dificil', 'bom', 'facil'];

    const responder = (dificuldade) => {
        if (!dificuldadesValidas.includes(dificuldade)) return;

        const novosRespondidos = [...respondidos];
        novosRespondidos[cartaoAtual] =
            dificuldade === 'bom' || dificuldade === 'facil';

        setRespondidos(novosRespondidos);

        if (cartaoAtual < flashcards.length - 1) {
            setTimeout(() => {
                setCartaoAtual(cartaoAtual + 1);
                setEstaVirado(false);
            }, 300);
        }
    };

    const virarCartao = () => {
        setEstaVirado(!estaVirado);
    };

    const anterior = () => {
        if (cartaoAtual > 0) {
            setCartaoAtual(cartaoAtual - 1);
            setEstaVirado(false);
        }
    };

    const proximo = () => {
        if (cartaoAtual < flashcards.length - 1) {
            setCartaoAtual(cartaoAtual + 1);
            setEstaVirado(false);
        }
    };

    return (
        <div className="min-h-screen from-background to-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Cabeçalho */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => onNavigate('dashboard')}
                        className="mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Voltar ao Dashboard
                    </Button>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-foreground mb-2">Sessão de Revisão</h1>
                            <p className="text-muted-foreground">
                                Cartão {cartaoAtual + 1} de {flashcards.length}
                            </p>
                        </div>
                        <Badge variant="secondary" className="gap-2">
                            <Clock className="w-4 h-4" />
                            {cartao.proximaRevisao}
                        </Badge>
                    </div>
                    <Progress value={progresso} className="h-2" />
                </div>

                {/* Flashcard */}
                <div className="mb-8 perspective-1000">
                    <div
                        className={`relative w-full transition-all duration-500 transform-style-3d ${estaVirado ? 'rotate-y-180' : ''
                            }`}
                        style={{
                            transformStyle: 'preserve-3d',
                            minHeight: '600px'
                        }}
                    >
                        
                        <Card
                            className={`absolute inset-0 p-8 cursor-pointer backface-hidden ${estaVirado ? 'opacity-0 pointer-events-none' : 'opacity-100'
                                }`}
                            onClick={virarCartao}
                        >
                            <div className="flex flex-col items-center justify-center h-full space-y-6">
                                <Badge className="bg-green-100 text-black border-gray-200">
                                    {cartao.dificuldade}
                                </Badge>

                                <div className="w-full max-w-sm aspect-video rounded-xl overflow-hidden bg-muted">
                                    <ImageWithFallback
                                        src={cartao.imagem}
                                        alt={cartao.palavra}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="text-center space-y-4">
                                    <h2 className="text-5xl text-foreground">{cartao.palavra}</h2>
                                    <div className="flex items-center justify-center gap-3">
                                        <p className="text-xl text-muted-foreground">{cartao.fonetica}</p>
                                        <Button size="icon" variant="ghost" className="rounded-full">
                                            <Volume2 className="w-5 h-5 text-primary" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-muted/50 rounded-lg max-w-md">
                                    <p className="text-muted-foreground italic">"{cartao.exemplo}"</p>
                                </div>

                                <Button
                                    variant="outline"
                                    className="gap-2 mt-auto"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        virarCartao();
                                    }}
                                >
                                    <RotateCw className="w-4 h-4" />
                                    Mostrar resposta
                                </Button>
                            </div>
                        </Card>

                        {/* Verso */}
                        <Card
                            className={`absolute inset-0 p-8 cursor-pointer backface-hidden ${estaVirado ? 'opacity-100' : 'opacity-0 pointer-events-none'
                                }`}
                            style={{ transform: 'rotateY(180deg)' }}
                            onClick={virarCartao}
                        >
                            <div className="flex flex-col items-center justify-center h-full space-y-6">
                                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                                    Tradução
                                </Badge>

                                <div className="w-full max-w-sm aspect-video rounded-xl overflow-hidden bg-muted">
                                    <ImageWithFallback
                                        src={cartao.imagem}
                                        alt={cartao.traducao}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="text-center space-y-4">
                                    <h2 className="text-5xl text-foreground">{cartao.traducao}</h2>
                                    <p className="text-xl text-muted-foreground">{cartao.palavra}</p>
                                </div>

                                <div className="text-center p-4 bg-muted/50 rounded-lg max-w-md space-y-2">
                                    <p className="text-muted-foreground italic">"{cartao.exemplo}"</p>
                                    <p className="text-sm text-muted-foreground">
                                        {cartao.exemploTraducao}
                                    </p>
                                </div>

                                <div className="w-full max-w-md mt-auto">
                                    <p className="text-sm text-center text-muted-foreground mb-4">
                                        Como você avalia sua resposta?
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Button
                                            variant="outline"
                                            className="h-auto py-3 flex flex-col gap-1 border-destructive/50 hover:bg-red-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                responder('novamente');
                                            }}
                                        >
                                            <XCircle className="w-5 h-5 text-destructive" />
                                            <span className="text-sm">Novamente</span>
                                            <span className="text-xs text-muted-foreground">&lt;1 min</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-auto py-3 flex flex-col gap-1 border-amber-200 hover:bg-yellow-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                responder('dificil');
                                            }}
                                        >
                                            <span className="text-lg">😅</span>
                                            <span className="text-sm">Difícil</span>
                                            <span className="text-xs text-muted-foreground">10 min</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-auto py-3 flex flex-col gap-1 border-blue-300 hover:bg-blue-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                responder('bom');
                                            }}
                                        >
                                            <span className="text-lg">😊</span>
                                            <span className="text-sm">Bom</span>
                                            <span className="text-xs text-muted-foreground">3 dias</span>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-auto py-3 flex flex-col gap-1 border-emerald-300 hover:bg-green-50"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                responder('facil');
                                            }}
                                        >
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            <span className="text-sm">Fácil</span>
                                            <span className="text-xs text-muted-foreground">7 dias</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Controles de Navegação */}
                <div className="flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={anterior}
                        disabled={cartaoAtual === 0}
                        className="gap-2"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                    </Button>

                    <div className="flex gap-2">
                        {flashcards.map((_, indice) => (
                            <div
                                key={indice}
                                className={`w-2 h-2 rounded-full transition-all ${indice === cartaoAtual
                                    ? 'bg-primary w-8'
                                    : respondidos[indice] === true
                                        ? 'bg-green-200'
                                        : respondidos[indice] === false
                                            ? 'bg-red-200'
                                            : 'bg-muted'
                                    }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        onClick={proximo}
                        disabled={cartaoAtual === flashcards.length - 1}
                        className="gap-2"
                    >
                        Próximo
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}