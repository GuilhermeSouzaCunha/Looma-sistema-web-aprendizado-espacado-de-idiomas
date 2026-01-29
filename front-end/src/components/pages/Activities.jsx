import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { MessageSquare, Mic, Headphones, PenTool, Star, CheckCircle2, XCircle, ChevronLeft, Trophy } from "lucide-react";

export default function Atividades({ onNavigate }) {
    let progressoAtual = 35;
    let progressoMaximo = 50;
    
    const [atividadeSelecionada, setAtividadeSelecionada] = useState(null);
    const [questaoAtual, setQuestaoAtual] = useState(0);
    const [pontuacao, setPontuacao] = useState(0);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null);

    const atividades = [
        {
            id: "translation",
            titulo: "Tradução",
            descricao: "Traduza frases do inglês para o português",
            icone: MessageSquare,
            cor: "text-emerald-500",
            corFundo: "bg-emerald-100",
            corBorda: "border-emerald-100",
            pontos: 50,
            questoes: 8
        },
        {
            id: "speaking",
            titulo: "Pronúncia",
            descricao: "Pratique a pronúncia de palavras e frases",
            icone: Mic,
            cor: "text-blue-500",
            corFundo: "bg-blue-100",
            corBorda: "border-blue-100",
            pontos: 75,
            questoes: 6
        },
        {
            id: "listening",
            titulo: "Audição",
            descricao: "Ouça e compreenda conversações",
            icone: Headphones,
            cor: "text-purple-500",
            corFundo: "bg-purple-500/10",
            corBorda: "border-purple-500/20",
            pontos: 60,
            questoes: 10
        },
        {
            id: "writing",
            titulo: "Escrita",
            descricao: "Complete frases e escreva respostas",
            icone: PenTool,
            cor: "text-yellow-500",
            corFundo: "bg-yellow-100",
            corBorda: "border-yellow-100",
            pontos: 80,
            questoes: 5
        }
    ];

    const questoesTraducao = [
        {
            pergunta: "Como você diz 'Good Morning' em português?",
            imagem: "https://images.unsplash.com/photo-1495197359483-d092478c170a?w=400",
            opcoes: ["Boa tarde", "Bom dia", "Boa noite", "Olá"],
            correta: 1
        },
        {
            pergunta: "Traduza: 'I love learning languages'",
            imagem: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400",
            opcoes: [
                "Eu gosto de aprender idiomas",
                "Eu amo aprender idiomas",
                "Eu estou aprendendo idiomas",
                "Eu quero aprender idiomas"
            ],
            correta: 1
        },
        {
            pergunta: "O que significa 'Thank you very much'?",
            imagem: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400",
            opcoes: [
                "De nada",
                "Por favor",
                "Muito obrigado",
                "Com licença"
            ],
            correta: 2
        }
    ];

    const selecionarAtividade = (idAtividade) => {
        setAtividadeSelecionada(idAtividade);
        setQuestaoAtual(0);
        setPontuacao(0);
        setMostrarResultado(false);
        setRespostaSelecionada(null);
    };

    const selecionarResposta = (indice) => {
        setRespostaSelecionada(indice);
    };

    const verificarResposta = () => {
        if (respostaSelecionada === null) return;

        const acertou = respostaSelecionada === questoesTraducao[questaoAtual].correta;
        if (acertou) {
            setPontuacao(pontuacao + 1);
        }
        setMostrarResultado(true);

        setTimeout(() => {
            if (questaoAtual < questoesTraducao.length - 1) {
                setQuestaoAtual(questaoAtual + 1);
                setRespostaSelecionada(null);
                setMostrarResultado(false);
            }
        }, 1500);
    };

    const voltarParaAtividades = () => {
        setAtividadeSelecionada(null);
        setQuestaoAtual(0);
        setPontuacao(0);
        setMostrarResultado(false);
        setRespostaSelecionada(null);
    };

    if (atividadeSelecionada === 'translation') {
        const questao = questoesTraducao[questaoAtual];
        const progresso = ((questaoAtual + 1) / questoesTraducao.length) * 100;

        return (
            <div className="min-h-screen from-background to-muted/30 py-8">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Button
                        variant="ghost"
                        onClick={voltarParaAtividades}
                        className="mb-4"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Voltar às Atividades
                    </Button>

                    {/* Progresso */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-foreground">
                                Questão {questaoAtual + 1} de {questoesTraducao.length}
                            </h2>
                            <Badge className="bg-primary/10 text-primary gap-2">
                                <Trophy className="w-4 h-4" />
                                {pontuacao * 10} pontos
                            </Badge>
                        </div>
                        <Progress value={progresso} className="h-2" />
                    </div>

                    {/* Card da Questão */}
                    <Card className="p-8 mb-6">
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-2xl text-foreground mb-4">{questao.pergunta}</h3>
                            </div>

                            <div className="w-full max-w-md mx-auto aspect-video rounded-xl overflow-hidden bg-muted">
                                <img
                                    src={questao.imagem}
                                    alt="Ilustração da questão"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="space-y-3">
                                {questao.opcoes.map((opcao, indice) => (
                                    <button
                                        key={indice}
                                        onClick={() => !mostrarResultado && selecionarResposta(indice)}
                                        disabled={mostrarResultado}
                                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${mostrarResultado
                                            ? indice === questao.correta
                                                ? 'bg-primary/10 border-primary text-primary'
                                                : indice === respostaSelecionada
                                                    ? 'bg-destructive/10 border-destructive text-destructive'
                                                    : 'bg-muted/30 border-muted'
                                            : respostaSelecionada === indice
                                                ? 'bg-primary/10 border-primary'
                                                : 'bg-card border-border hover:border-primary/50 hover:bg-muted/30'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{opcao}</span>
                                            {mostrarResultado && indice === questao.correta && (
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                            )}
                                            {mostrarResultado && indice === respostaSelecionada && indice !== questao.correta && (
                                                <XCircle className="w-5 h-5 text-destructive" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Botão Verificar */}
                    {!mostrarResultado && (
                        <Button
                            className="w-full bg-primary hover:bg-primary/90 h-12"
                            onClick={verificarResposta}
                            disabled={respostaSelecionada === null}
                        >
                            Verificar Resposta
                        </Button>
                    )}

                    {/* Feedback do Resultado */}
                    {mostrarResultado && (
                        <div
                            className={`p-6 rounded-lg text-center ${respostaSelecionada === questao.correta
                                ? 'bg-primary/10 border-2 border-primary/20'
                                : 'bg-destructive/10 border-2 border-destructive/20'
                                }`}
                        >
                            <div className="text-2xl mb-2">
                                {respostaSelecionada === questao.correta ? '🎉 Correto!' : '😅 Incorreto'}
                            </div>
                            <p className="text-muted-foreground">
                                {respostaSelecionada === questao.correta
                                    ? 'Ótimo trabalho! Continue assim!'
                                    : 'Não desanime! Continue praticando.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Lista de Atividades
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
                    <h1 className="text-2xl mb-2">Atividades Interativas</h1>
                    <p className="text-muted-foreground">
                        Pratique suas habilidades de forma divertida e interativa
                    </p>
                </div>

                {/* Missão Diária */}
                <Card className="p-6 mb-8 from-accent/10 to-primary/10 bg-amber-50 border-2 border-amber-100">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                            <Star className="w-8 h-8 text-amber-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="mb-1">Missão Diária</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                Complete 3 atividades diferentes hoje
                            </p>
                            <Progress value={(progressoAtual / progressoMaximo) * 100} className="[&>div]:bg-emerald-500 bg-emerald-100" />
                        </div>
                        <Badge className="bg-amber-400 text-white">
                            +100 XP
                        </Badge>
                    </div>
                </Card>

                {/* Grid de Atividades */}
                <div className="grid sm:grid-cols-2 gap-6">
                    {atividades.map((atividade) => (
                        <Card
                            key={atividade.id}
                            className={`p-6 cursor-pointer hover:shadow-lg transition-all border-2 ${atividade.corBorda}`}
                            onClick={() => selecionarAtividade(atividade.id)}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 rounded-xl ${atividade.corFundo} flex items-center justify-center`}>
                                    <atividade.icone className={`w-7 h-7 ${atividade.cor}`} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-foreground mb-2">{atividade.titulo}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {atividade.descricao}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Trophy className="w-4 h-4" />
                                            {atividade.pontos} XP
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MessageSquare className="w-4 h-4" />
                                            {atividade.questoes} questões
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Atividade Recente */}
                <div className="mt-12">
                    <h2 className="text-foreground mb-6">Atividade Recente</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Tradução</span>
                                <Badge className="text-white bg-blue-500">Hoje</Badge>
                            </div>
                            <div className="text-2xl text-foreground mb-1">85%</div>
                            <div className="text-sm text-muted-foreground">8/10 corretas</div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Pronúncia</span>
                                <Badge className="text-white bg-blue-500">Ontem</Badge>
                            </div>
                            <div className="text-2xl text-foreground mb-1">92%</div>
                            <div className="text-sm text-muted-foreground">6/6 corretas</div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">Audição</span>
                                <Badge className="text-white bg-blue-500">2 dias atrás</Badge>
                            </div>
                            <div className="text-2xl text-foreground mb-1">78%</div>
                            <div className="text-sm text-muted-foreground">7/9 corretas</div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}