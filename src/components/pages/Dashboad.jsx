import { FlameIcon, Target, ZapIcon, Clock, Zap, Star, Calendar, TrendingUp, Trophy, BookOpen, MoveRight } from "lucide-react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { tr } from "date-fns/locale"

function Dashboad({ onNavigate }) {
    let progressoAtual = 35
    let progressoMax = 50

    const stats = [
        { conteudoPrincipal: "7 dias", conteudoSegundario: "Sequência", icone: FlameIcon, cor: "text-amber-400" },
        { conteudoPrincipal: "1.250", conteudoSegundario: "Total de Pontos", icone: Trophy, cor: "text-green-500" },
        { conteudoPrincipal: "342", conteudoSegundario: "Palavras Aprendidas", icone: BookOpen, cor: "text-blue-500" },
        { conteudoPrincipal: "12h 45m", conteudoSegundario: "Tempo de Estudo", icone: Clock, cor: "text-purple-500" },
    ]

    const proximasRevisoes = [
        { frase: "Hello", traducao: "Olá", lingua: "Inglês", tempo: "Em 5 minutos", dificuldade: "Fácil" },
        { frase: "Bonjour", traducao: "Bom dia", lingua: "Francês", tempo: "Em 50 minutos", dificuldade: "Médio" },
        { frase: "Gracias", traducao: "Obrigado", lingua: "Espanhol", tempo: "Em 1 horas", dificuldade: "Fácil" },
        { frase: "Gutan Tag", traducao: "Bom dia", lingua: "Alemão", tempo: "Amanhã", dificuldade: "Difício" },
    ]

    const progressoSemanal = [
        { dia: "S", ehCompleto: true },
        { dia: "T", ehCompleto: true },
        { dia: "Q", ehCompleto: true },
        { dia: "Q", ehCompleto: false },
        { dia: "S", ehCompleto: true },
        { dia: "S", ehCompleto: true },
        { dia: "D", ehCompleto: false },
    ]

    const conquistas = [
        { titulo: "Primeira Semana", descricao: "Complete 7 dias seguidos", ehCompleto: true },
        { titulo: "Mestre das Palavras", descricao: "Aprenda 500 palavras", ehCompleto: false },
        { titulo: "Poligrota", descricao: "Estude 2 idiomas", ehCompleto: false },
    ]

    return (
        <div className="min-h-screen from-background to-muted/30">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-foreground mb-2 text-2xl">Bem-vindo de volta, Maria!</h1>
                    <p className="text-muted-foreground">
                        Continue sua jornada de aprendizado
                    </p>
                </div>

                <Card className="p-6 mb-8 bg-section border-2 bg-teal-50">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                                <Target className="w-6 h-6 text-emerald-500" />
                            </div>
                            <div>
                                <h3 className="text-foreground">Meta Diária</h3>
                                <p className="text-sm text-muted-foreground">
                                    {progressoAtual} de {progressoMax} pontos
                                </p>
                            </div>
                        </div>
                        <Button
                            size="lg"
                            className="bg-emerald-500 hover:bg-emerald-400 gap-2"
                        >
                            <ZapIcon className="w-4 h-4" />
                            Iniciar Revisão
                        </Button>
                    </div>
                    <Progress value={(progressoAtual / progressoMax) * 100} className="[&>div]:bg-emerald-500 bg-emerald-100" />
                </Card>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <Card key={index} className="p-6 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <stat.icone className={`w-5 h-5 ${stat.cor}`} />
                            </div>
                            <div className="text-2xl text-foreground mb-1">{stat.conteudoPrincipal}</div>
                            <div className="text-sm text-muted-foreground">{stat.conteudoSegundario}</div>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-foreground flex items-center gap-2">
                                <Clock className="w-5 h-5 text-green-500" />
                                Próximos Revisões
                            </h3>
                            <Button
                                variant="ghost"
                                className="hover:bg-amber-400"
                                onClick={() => onNavigate("flashcards")}
                            >
                                Ver Todas
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {proximasRevisoes.map((revisao, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 rounded-lh bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-foreground">
                                                {revisao.frase}
                                            </span>
                                            <span>
                                                <MoveRight className="text-gray-500 size-4" />
                                            </span>
                                            <span className="text-muted-foreground">
                                                {revisao.traducao}
                                            </span>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {revisao.lingua}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="text-xs">
                                            {revisao.tempo}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="text-foreground flex items-center gap-2 mb-4">
                                <Calendar className="text-green-500" />
                                Progresso Semanal
                            </h3>
                            <div className="flex justify-between gap-2">
                                {progressoSemanal.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${item.ehCompleto
                                                ? "bg-emerald-500 text-white"
                                                : "bg-muted text-muted-foreground"
                                                }`}
                                        >
                                            {item.dia}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className="text-foreground flex items-center gap-2 mb-4">
                                <Star className="w-5 h-5 text-amber-400" />
                                Conquistas Recentes
                            </h3>
                            <div className="spae-y-3">
                                {conquistas.map((conquista, index) => (
                                    <div
                                        key={index}
                                        className={`mb-3 p-3 rounded-lg border-2 ${conquista.ehCompleto
                                            ? "bg-amber-50 border-amber-200"
                                            : "bg-muted/30 border-muted opacity-60"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${conquista.ehCompleto
                                                    ? "bg-amber-100"
                                                    : "text-muted-foreground"
                                                    }`}
                                            >
                                                <Trophy
                                                    className={`w-5 h-5 ${conquista.ehCompleto
                                                        ? "text-amber-300"
                                                        : "text-muted-foreground"
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

                        <Card className="p-6">
                            <h3 className="text-foreground mb-4">
                                Ações Rápidas
                            </h3>
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2 hover:bg-amber-400"
                                    onClick={() => onNavigate("activities")}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Praticar Atividades
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2 hover:bg-amber-400"
                                    onClick={() => onNavigate("ranking")}
                                >
                                    <Trophy className="w-4 h-4" />
                                    Ver Ranking
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboad