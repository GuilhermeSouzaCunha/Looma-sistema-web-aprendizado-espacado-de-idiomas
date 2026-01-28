import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Trophy, Medal, Crown, TrendingUp, Users, ChevronLeft, Flame, Star } from "lucide-react";

export default function Ranking({ onNavigate }) {
    const rankingGlobal = [
        {
            posicao: 1,
            nome: "João Silva",
            pontos: 3450,
            sequencia: 25,
            nivel: 12,
            avatar: "JS",
            tendencia: "subindo"
        },
        {
            posicao: 2,
            nome: "Ana Costa",
            pontos: 3200,
            sequencia: 18,
            nivel: 11,
            avatar: "AC",
            tendencia: "subindo"
        },
        {
            posicao: 3,
            nome: "Pedro Santos",
            pontos: 2980,
            sequencia: 22,
            nivel: 10,
            avatar: "PS",
            tendencia: "descendo"
        },
        {
            posicao: 4,
            nome: "Maria Oliveira",
            pontos: 2750,
            sequencia: 15,
            nivel: 10,
            avatar: "MO",
            tendencia: "subindo"
        },
        {
            posicao: 5,
            nome: "Carlos Mendes",
            pontos: 2500,
            sequencia: 12,
            nivel: 9,
            avatar: "CM",
            tendencia: "estavel"
        },
        {
            posicao: 6,
            nome: "Lucia Ferreira",
            pontos: 2350,
            sequencia: 20,
            nivel: 9,
            avatar: "LF",
            tendencia: "subindo"
        },
        {
            posicao: 7,
            nome: "Roberto Lima",
            pontos: 2100,
            sequencia: 8,
            nivel: 8,
            avatar: "RL",
            tendencia: "descendo"
        },
        {
            posicao: 8,
            nome: "Fernanda Rocha",
            pontos: 1950,
            sequencia: 14,
            nivel: 8,
            avatar: "FR",
            tendencia: "subindo"
        },
        {
            posicao: 9,
            nome: "Você",
            pontos: 1250,
            sequencia: 7,
            nivel: 6,
            avatar: "MR",
            tendencia: "subindo",
            ehUsuarioAtual: true
        },
        {
            posicao: 10,
            nome: "Ricardo Souza",
            pontos: 1180,
            sequencia: 5,
            nivel: 6,
            avatar: "RS",
            tendencia: "estavel"
        }
    ];

    const rankingSemanal = rankingGlobal.map((usuario, indice) => ({
        ...usuario,
        posicao: indice + 1,
        pontos: Math.floor(usuario.pontos * 0.3)
    }));

    const conquistas = [
        {
            titulo: "Primeira Semana",
            descricao: "Complete 7 dias seguidos",
            icone: Flame,
            cor: "text-yellow-500",
            desbloqueada: true
        },
        {
            titulo: "Top 100",
            descricao: "Entre nos 100 melhores",
            icone: Trophy,
            cor: "text-green-500",
            desbloqueada: true
        },
        {
            titulo: "Mestre das Palavras",
            descricao: "Aprenda 500 palavras",
            icone: Star,
            cor: "text-yellow-500",
            desbloqueada: false
        },
        {
            titulo: "Velocista",
            descricao: "Complete 10 lições em um dia",
            icone: TrendingUp,
            cor: "text-purple-500",
            desbloqueada: false
        }
    ];

    const obterIconePosicao = (posicao) => {
        if (posicao === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
        if (posicao === 2) return <Medal className="w-5 h-5 text-gray-400" />;
        if (posicao === 3) return <Medal className="w-5 h-5 text-amber-600" />;
        return <span className="text-sm text-muted-foreground">#{posicao}</span>;
    };

    const obterIconeTendencia = (tendencia) => {
        if (tendencia === "subindo") return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (tendencia === "descendo") return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
        return <div className="w-4 h-4" />;
    };

    const ListaRanking = ({ dados }) => (
        <div className="space-y-2">
            {dados.map((usuario) => (
                <Card
                    key={usuario.posicao}
                    className={`p-4 transition-all ${usuario.ehUsuarioAtual
                            ? 'bg-green-50 border-2 border-green-500 shadow-md'
                            : 'hover:shadow-md'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 flex items-center justify-center">
                            {obterIconePosicao(usuario.posicao)}
                        </div>

                        <Avatar className={usuario.posicao <= 3 ? 'ring-2 ring-yellow-400' : ''}>
                            <AvatarFallback className={usuario.ehUsuarioAtual ? 'bg-green-600 text-white' : ''}>
                                {usuario.avatar}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-foreground">{usuario.nome}</span>
                                {usuario.ehUsuarioAtual && (
                                    <Badge className="text-xs text-white bg-blue-500">Você</Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>Nível {usuario.nivel}</span>
                                <div className="flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-yellow-500" />
                                    {usuario.sequencia}
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-foreground mb-1">{usuario.pontos.toLocaleString()}</div>
                            <div className="flex items-center justify-end gap-1">
                                {obterIconeTendencia(usuario.tendencia)}
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen from-background to-muted/30 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <Button
                    variant="ghost"
                    onClick={() => onNavigate('dashboard')}
                    className="mb-4"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Voltar ao Dashboard
                </Button>

                <div className="mb-8">
                    <h1 className="text-2xl mb-2">Ranking Global</h1>
                    <p className="text-muted-foreground">
                        Veja como você está se saindo em comparação com outros estudantes
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card className="p-6 mb-6 bg-yellow-50">
                            <h3 className="text-foreground mb-6 flex items-center gap-2">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                Top 3 da Semana
                            </h3>
                            <div className="flex items-end justify-center gap-4">
                                <div className="flex-1 text-center">
                                    <Avatar className="w-16 h-16 mx-auto mb-3 ring-2 ring-gray-400">
                                        <AvatarFallback>{rankingGlobal[1].avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-foreground mb-1">{rankingGlobal[1].nome}</div>
                                    <Badge className="mb-2 bg-blue-500">
                                        {rankingGlobal[1].pontos.toLocaleString()}
                                    </Badge>
                                    <div className="h-24 bg-gray-400/20 rounded-t-lg flex items-end justify-center pb-2">
                                        <Medal className="w-6 h-6 text-gray-400" />
                                    </div>
                                </div>

                                <div className="flex-1 text-center">
                                    <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-amber-400">
                                        <AvatarFallback>{rankingGlobal[0].avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-foreground mb-1">{rankingGlobal[0].nome}</div>
                                    <Badge className="mb-2 bg-yellow-500">
                                        {rankingGlobal[0].pontos.toLocaleString()}
                                    </Badge>
                                    <div className="h-32 bg-yellow-100 rounded-t-lg flex items-end justify-center pb-2">
                                        <Crown className="w-8 h-8 text-yellow-500" />
                                    </div>
                                </div>

                                <div className="flex-1 text-center">
                                    <Avatar className="w-16 h-16 mx-auto mb-3 ring-2 ring-amber-600">
                                        <AvatarFallback>{rankingGlobal[2].avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-foreground mb-1">{rankingGlobal[2].nome}</div>
                                    <Badge className="mb-2 bg-blue-500">
                                        {rankingGlobal[2].pontos.toLocaleString()}
                                    </Badge>
                                    <div className="h-20 bg-amber-600/20 rounded-t-lg flex items-end justify-center pb-2">
                                        <Medal className="w-6 h-6 text-amber-600" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Tabs defaultValue="global" className="w-full">
                            <TabsList className="w-full mb-4">
                                <TabsTrigger value="global" className="flex-1 gap-2">
                                    <Users className="w-4 h-4" />
                                    Global
                                </TabsTrigger>
                                <TabsTrigger value="semanal" className="flex-1 gap-2">
                                    <Trophy className="w-4 h-4" />
                                    Semanal
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="global">
                                <ListaRanking dados={rankingGlobal} />
                            </TabsContent>

                            <TabsContent value="semanal">
                                <ListaRanking dados={rankingSemanal} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Lateral */}
                    <div className="space-y-6">
                        <Card className="p-6 bg-teal-50">
                            <h3 className="text-foreground mb-4">Suas Estatísticas</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Posição Global</span>
                                    <Badge className="bg-green-500">#9</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Pontos Totais</span>
                                    <span className="text-foreground">1.250</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Sequência Atual</span>
                                    <div className="flex items-center gap-1">
                                        <Flame className="w-4 h-4 text-yellow-400" />
                                        <span className="text-foreground">7 dias</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Nível</span>
                                    <Badge className="bg-blue-500">6</Badge>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-foreground mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                Conquistas
                            </h3>
                            <div className="space-y-3">
                                {conquistas.map((conquista, indice) => (
                                    <div
                                        key={indice}
                                        className={`p-3 rounded-lg border-2 ${conquista.desbloqueada
                                                ? 'bg-yellow-50 border-yellow-100'
                                                : 'bg-gray-50 border-gray-100 opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${conquista.desbloqueada ? 'bg-yellow-100' : 'bg-gray-100'
                                                    }`}
                                            >
                                                <conquista.icone
                                                    className={`w-5 h-5 ${conquista.desbloqueada ? conquista.cor : 'text-muted-foreground'
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm text-foreground mb-1">
                                                    {conquista.titulo}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {conquista.descricao}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6 bg-linear-to-br from-green-500 to-blue-500 text-white">
                            <div className="text-center">
                                <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-90" />
                                <h4 className="mb-2">Continue assim!</h4>
                                <p className="text-sm opacity-90">
                                    Você subiu 3 posições esta semana. Mantenha o ritmo!
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}