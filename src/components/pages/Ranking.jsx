import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Trophy, Medal, Crown, TrendingUp, Users, ChevronLeft, Flame,Star } from "lucide-react";

export default function Ranking({ onNavigate }) {
    const globalRanking = [
        {
            rank: 1,
            name: "João Silva",
            points: 3450,
            streak: 25,
            level: 12,
            avatar: "JS",
            trend: "up"
        },
        {
            rank: 2,
            name: "Ana Costa",
            points: 3200,
            streak: 18,
            level: 11,
            avatar: "AC",
            trend: "up"
        },
        {
            rank: 3,
            name: "Pedro Santos",
            points: 2980,
            streak: 22,
            level: 10,
            avatar: "PS",
            trend: "down"
        },
        {
            rank: 4,
            name: "Maria Oliveira",
            points: 2750,
            streak: 15,
            level: 10,
            avatar: "MO",
            trend: "up"
        },
        {
            rank: 5,
            name: "Carlos Mendes",
            points: 2500,
            streak: 12,
            level: 9,
            avatar: "CM",
            trend: "same"
        },
        {
            rank: 6,
            name: "Lucia Ferreira",
            points: 2350,
            streak: 20,
            level: 9,
            avatar: "LF",
            trend: "up"
        },
        {
            rank: 7,
            name: "Roberto Lima",
            points: 2100,
            streak: 8,
            level: 8,
            avatar: "RL",
            trend: "down"
        },
        {
            rank: 8,
            name: "Fernanda Rocha",
            points: 1950,
            streak: 14,
            level: 8,
            avatar: "FR",
            trend: "up"
        },
        {
            rank: 9,
            name: "Você",
            points: 1250,
            streak: 7,
            level: 6,
            avatar: "MR",
            trend: "up",
            isCurrentUser: true
        },
        {
            rank: 10,
            name: "Ricardo Souza",
            points: 1180,
            streak: 5,
            level: 6,
            avatar: "RS",
            trend: "same"
        }
    ];

    const weeklyRanking = globalRanking.map((user, index) => ({
        ...user,
        rank: index + 1,
        points: Math.floor(user.points * 0.3)
    }));

    const achievements = [
        {
            title: "Primeira Semana",
            description: "Complete 7 dias seguidos",
            icon: Flame,
            color: "text-yellow-500",
            unlocked: true
        },
        {
            title: "Top 100",
            description: "Entre nos 100 melhores",
            icon: Trophy,
            color: "text-green-500",
            unlocked: true
        },
        {
            title: "Mestre das Palavras",
            description: "Aprenda 500 palavras",
            icon: Star,
            color: "text-yellow-500",
            unlocked: false
        },
        {
            title: "Velocista",
            description: "Complete 10 lições em um dia",
            icon: TrendingUp,
            color: "text-purple-500",
            unlocked: false
        }
    ];

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500" />;
        if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
        if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
        return <span className="text-sm text-muted-foreground">#{rank}</span>;
    };

    const getTrendIcon = (trend) => {
        if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
        if (trend === "down") return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
        return <div className="w-4 h-4" />;
    };

    const RankingList = ({ data }) => (
        <div className="space-y-2">
            {data.map((user) => (
                <Card
                    key={user.rank}
                    className={`p-4 transition-all ${user.isCurrentUser
                            ? 'bg-green-50 border-2 border-green-500 shadow-md'
                            : 'hover:shadow-md'
                        }`}
                >
                    <div className="flex items-center gap-4">
                        {/* Rank */}
                        <div className="w-12 flex items-center justify-center">
                            {getRankIcon(user.rank)}
                        </div>

                        {/* Avatar */}
                        <Avatar className={user.rank <= 3 ? 'ring-2 ring-yellow-400' : ''}>
                            <AvatarFallback className={user.isCurrentUser ? 'bg-green-600 text-white' : ''}>
                                {user.avatar}
                            </AvatarFallback>
                        </Avatar>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-foreground">{user.name}</span>
                                {user.isCurrentUser && (
                                    <Badge className="text-xs texto-white bg-blue-500">Você</Badge>
                                )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <span>Nível {user.level}</span>
                                <div className="flex items-center gap-1">
                                    <Flame className="w-3 h-3 text-yellow-500" />
                                    {user.streak}
                                </div>
                            </div>
                        </div>

                        {/* Points & Trend */}
                        <div className="text-right">
                            <div className="text-foreground mb-1">{user.points.toLocaleString()}</div>
                            <div className="flex items-center justify-end gap-1">
                                {getTrendIcon(user.trend)}
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
                    {/* Main Ranking */}
                    <div className="lg:col-span-2">
                        {/* Top 3 Podium */}
                        <Card className="p-6 mb-6 bg-yellow-50">
                            <h3 className="text-foreground mb-6 flex items-center gap-2">
                                <Crown className="w-5 h-5 text-yellow-400" />
                                Top 3 da Semana
                            </h3>
                            <div className="flex items-end justify-center gap-4">
                                {/* 2nd Place */}
                                <div className="flex-1 text-center">
                                    <Avatar className="w-16 h-16 mx-auto mb-3 ring-2 ring-gray-400">
                                        <AvatarFallback>{globalRanking[1].avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-foreground mb-1">{globalRanking[1].name}</div>
                                    <Badge className="mb-2 bg-blue-500">
                                        {globalRanking[1].points.toLocaleString()}
                                    </Badge>
                                    <div className="h-24 bg-gray-400/20 rounded-t-lg flex items-end justify-center pb-2">
                                        <Medal className="w-6 h-6 text-gray-400" />
                                    </div>
                                </div>

                                {/* 1st Place */}
                                <div className="flex-1 text-center">
                                    <Avatar className="w-20 h-20 mx-auto mb-3 ring-4 ring-amber-400">
                                        <AvatarFallback>{globalRanking[0].avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-foreground mb-1">{globalRanking[0].name}</div>
                                    <Badge className="mb-2 bg-yellow-500">
                                        {globalRanking[0].points.toLocaleString()}
                                    </Badge>
                                    <div className="h-32 bg-yellow-100 rounded-t-lg flex items-end justify-center pb-2">
                                        <Crown className="w-8 h-8 text-yellow-500" />
                                    </div>
                                </div>

                                {/* 3rd Place */}
                                <div className="flex-1 text-center">
                                    <Avatar className="w-16 h-16 mx-auto mb-3 ring-2 ring-amber-600">
                                        <AvatarFallback>{globalRanking[2].avatar}</AvatarFallback>
                                    </Avatar>
                                    <div className="text-sm text-foreground mb-1">{globalRanking[2].name}</div>
                                    <Badge className="mb-2 bg-blue-500">
                                        {globalRanking[2].points.toLocaleString()}
                                    </Badge>
                                    <div className="h-20 bg-amber-600/20 rounded-t-lg flex items-end justify-center pb-2">
                                        <Medal className="w-6 h-6 text-amber-600" />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Ranking Tabs */}
                        <Tabs defaultValue="global" className="w-full">
                            <TabsList className="w-full mb-4">
                                <TabsTrigger value="global" className="flex-1 gap-2">
                                    <Users className="w-4 h-4" />
                                    Global
                                </TabsTrigger>
                                <TabsTrigger value="weekly" className="flex-1 gap-2">
                                    <Trophy className="w-4 h-4" />
                                    Semanal
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="global">
                                <RankingList data={globalRanking} />
                            </TabsContent>

                            <TabsContent value="weekly">
                                <RankingList data={weeklyRanking} />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Your Stats */}
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

                        {/* Achievements */}
                        <Card className="p-6">
                            <h3 className="text-foreground mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                Conquistas
                            </h3>
                            <div className="space-y-3">
                                {achievements.map((achievement, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-lg border-2 ${achievement.unlocked
                                                ? 'bg-yellow-50 border-yellow-100'
                                                : 'bg-gray-50 border-gray-100 opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                                                    }`}
                                            >
                                                <achievement.icon
                                                    className={`w-5 h-5 ${achievement.unlocked ? achievement.color : 'text-muted-foreground'
                                                        }`}
                                                />
                                            </div>
                                            <div>
                                                <div className="text-sm text-foreground mb-1">
                                                    {achievement.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {achievement.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Motivational Card */}
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
