import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Switch } from "../ui/switch";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { User, Settings, BookOpen, Clock, Target, Trophy, Flame, TrendingUp, Calendar, ChevronLeft, Bell, Globe, Moon, Volume2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function Profile({ onNavigate, modoEscuro, alternarModoEscuro }) {
    const dadosSemanais = [
        { dia: "Seg", minutos: 25 },
        { dia: "Ter", minutos: 30 },
        { dia: "Qua", minutos: 20 },
        { dia: "Qui", minutos: 35 },
        { dia: "Sex", minutos: 28 },
        { dia: "Sáb", minutos: 40 },
        { dia: "Dom", minutos: 15 }
    ];

    const dadosProgresso = [
        { mes: "Jan", palavras: 50 },
        { mes: "Fev", palavras: 120 },
        { mes: "Mar", palavras: 180 },
        { mes: "Abr", palavras: 250 },
        { mes: "Mai", palavras: 310 },
        { mes: "Jun", palavras: 342 }
    ];

    const idiomas = [
        { nome: "Inglês", nivel: "Intermediário", progresso: 65, bandeira: "🇬🇧" },
        { nome: "Espanhol", nivel: "Básico", progresso: 35, bandeira: "🇪🇸" },
        { nome: "Francês", nivel: "Iniciante", progresso: 15, bandeira: "🇫🇷" }
    ];

    const estatisticas = [
        { rotulo: "Tempo Total", valor: "142h 35m", icone: Clock, cor: "text-green-500" },
        { rotulo: "Palavras Aprendidas", valor: "342", icone: BookOpen, cor: "text-blue-500" },
        { rotulo: "Dias de Sequência", valor: "7", icone: Flame, cor: "text-yellow-500" },
        { rotulo: "Lições Completadas", valor: "86", icone: Target, cor: "text-purple-500" }
    ];

    const atividadeRecente = [
        { data: "Hoje", atividade: "Completou 15 flashcards", pontos: 50 },
        { data: "Hoje", atividade: "Atividade de tradução", pontos: 75 },
        { data: "Ontem", atividade: "Sequência de 7 dias alcançada", pontos: 100 },
        { data: "2 dias atrás", atividade: "Nível 6 alcançado", pontos: 200 }
    ];

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

                <Card className="p-8 mb-8 bg-linear-to-br from-green-50 to-blue-50/2">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <Avatar className="w-24 h-24 ring-4 ring-green-500">
                            <AvatarFallback className="bg-green-500 text-white text-2xl">MR</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-center sm:text-left">
                            <h1 className="text-foreground mb-2">Maria Rodrigues</h1>
                            <p className="text-muted-foreground mb-3">maria.rodrigues@email.com</p>
                            <div className="flex items-center gap-3 justify-center sm:justify-start">
                                <Badge className="bg-green-500 gap-2">
                                    <Trophy className="w-4 h-4" />
                                    Nível 6
                                </Badge>
                                <Badge variant="secondary" className="gap-2 bg-blue-500 text-white">
                                    <Flame className="w-4 h-4 text-yellow-500" />
                                    7 dias
                                </Badge>
                                <Badge variant="outline">1.250 pontos</Badge>
                            </div>
                        </div>
                        <Button className="bg-emerald-500 hover:bg-emerald-300">
                            Editar Perfil
                        </Button>
                    </div>
                </Card>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {estatisticas.map((estatistica, indice) => (
                        <Card key={indice} className="p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                    <estatistica.icone className={`w-5 h-5 ${estatistica.cor}`} />
                                </div>
                            </div>
                            <div className="text-2xl text-foreground mb-1">{estatistica.valor}</div>
                            <div className="text-sm text-muted-foreground">{estatistica.rotulo}</div>
                        </Card>
                    ))}
                </div>

                <Tabs defaultValue="estatisticas" className="w-full">
                    <TabsList className="w-full mb-6">
                        <TabsTrigger value="estatisticas" className="flex-1 gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Estatísticas
                        </TabsTrigger>
                        <TabsTrigger value="idiomas" className="flex-1 gap-2">
                            <Globe className="w-4 h-4" />
                            Idiomas
                        </TabsTrigger>
                        <TabsTrigger value="configuracoes" className="flex-1 gap-2">
                            <Settings className="w-4 h-4" />
                            Configurações
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="estatisticas" className="space-y-6">
                        <div className="grid lg:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <h3 className="text-foreground mb-6 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-emerald-500" />
                                    Tempo de Estudo Semanal
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <BarChart data={dadosSemanais}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                        <XAxis dataKey="dia" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="minutos" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-foreground mb-6 flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    Progresso de Vocabulário
                                </h3>
                                <ResponsiveContainer width="100%" height={250}>
                                    <LineChart data={dadosProgresso}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                                        <XAxis dataKey="mes" />
                                        <YAxis />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="palavras"
                                            stroke="hsl(var(--secondary))"
                                            strokeWidth={3}
                                            dot={{ fill: "hsl(var(--secondary))", r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Card>
                        </div>

                        <Card className="p-6">
                            <h3 className="text-foreground mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-emerald-500" />
                                Atividade Recente
                            </h3>
                            <div className="space-y-3">
                                {atividadeRecente.map((item, indice) => (
                                    <div
                                        key={indice}
                                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <div>
                                                <p className="text-foreground text-sm">{item.atividade}</p>
                                                <p className="text-xs text-muted-foreground">{item.data}</p>
                                            </div>
                                        </div>
                                        <Badge className="gap-1 bg-blue-500">
                                            <Trophy className="w-3 h-3" />
                                            +{item.pontos}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="idiomas" className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-foreground flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-emerald-500" />
                                    Idiomas em Aprendizado
                                </h3>
                                <Button variant="outline" size="sm">
                                    Adicionar Idioma
                                </Button>
                            </div>
                            <div className="space-y-6">
                                {idiomas.map((idioma, indice) => (
                                    <div key={indice} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{idioma.bandeira}</span>
                                                <div>
                                                    <div className="text-foreground">{idioma.nome}</div>
                                                    <div className="text-sm text-muted-foreground">{idioma.nivel}</div>
                                                </div>
                                            </div>
                                            <Badge className="bg-blue-500">{idioma.progresso}%</Badge>
                                        </div>
                                        <Progress value={idioma.progresso} className="h-2" />
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-foreground mb-6 flex items-center gap-2">
                                <Target className="w-5 h-5 text-emerald-500" />
                                Metas de Aprendizado
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                    <div>
                                        <p className="text-foreground text-sm mb-1">Meta Diária</p>
                                        <p className="text-xs text-muted-foreground">50 pontos por dia</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                    <div>
                                        <p className="text-foreground text-sm mb-1">Meta Semanal</p>
                                        <p className="text-xs text-muted-foreground">7 dias de sequência</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                    <div>
                                        <p className="text-foreground text-sm mb-1">Meta Mensal</p>
                                        <p className="text-xs text-muted-foreground">100 palavras novas</p>
                                    </div>
                                    <Switch />
                                </div>
                            </div>
                        </Card>
                    </TabsContent>

                    <TabsContent value="configuracoes" className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-foreground mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-emerald-500" />
                                Preferências
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <Moon className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-foreground text-sm mb-1">Modo Escuro</p>
                                            <p className="text-xs text-muted-foreground">Ativar tema escuro</p>
                                        </div>
                                    </div>
                                    <Switch checked={modoEscuro} onCheckedChange={alternarModoEscuro} />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <Volume2 className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-foreground text-sm mb-1">Efeitos Sonoros</p>
                                            <p className="text-xs text-muted-foreground">Sons de feedback e música</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                                    <div className="flex items-center gap-3">
                                        <Bell className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="text-foreground text-sm mb-1">Notificações</p>
                                            <p className="text-xs text-muted-foreground">Lembretes de estudo</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-foreground mb-6">Conta</h3>
                            <div className="space-y-3">
                                <Button variant="outline" className="w-full justify-start">
                                    <User className="w-4 h-4 mr-2" />
                                    Alterar Senha
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Idioma da Interface
                                </Button>
                                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                                    Excluir Conta
                                </Button>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}