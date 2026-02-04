import { ArrowUpRight, BookOpen, MessageSquare, PenTool } from "lucide-react";
import type { BlogPost } from "../../types/portfolio";

type Props = {
    theme: "dark" | "light";
    pointColor: string;
    pointBg: string;
    glassBase: string;
    blogPosts: BlogPost[];
};

export default function WritingSection({ theme, pointColor, pointBg, glassBase, blogPosts }: Props) {
    return (
        <section id="writing" className="relative py-20 md:py-48 px-6 md:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
                    <div className="w-full lg:w-[35%] lg:sticky lg:top-32 self-start space-y-6 md:space-y-8">
                        <div className="space-y-3 md:space-y-4">
                            <span className={`${pointColor} font-mono text-xs md:text-sm tracking-widest uppercase block`}>04. Writing</span>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
                                SHARED<br />
                                <span className={`${pointColor} italic font-light text-2xl sm:text-3xl md:text-6xl uppercase`}>KNOWLEDGE.</span>
                            </h2>
                        </div>
                        <p className="opacity-60 text-sm md:text-base font-light leading-relaxed max-w-sm">
                            경험을 기록하고 지식을 나누는 과정을 즐깁니다. Velog에 작성된 최신 기술 아티클들입니다.
                        </p>
                        <div className={`p-6 rounded-[30px] border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/90 shadow-md'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${pointBg} flex items-center justify-center text-white md:text-black shadow-lg`}><PenTool size={24} /></div>
                                <div>
                                    <h4 className="font-black tracking-tighter uppercase text-lg">Velog Blog</h4>
                                    <span className="text-[10px] font-bold opacity-40 tracking-widest uppercase">@jiyean.dev</span>
                                </div>
                            </div>
                            <a href="https://velog.io" target="_blank" rel="noopener noreferrer" className={`w-full py-3 ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'} rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:${pointBg} hover:text-white md:hover:text-black transition-all group`}>
                                블로그 바로가기 <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-[65%] flex flex-col gap-6 md:gap-8">
                        {blogPosts.map((post, idx) => (
                            <a key={idx} href={post.link} target="_blank" rel="noopener noreferrer" className={`group block ${glassBase} p-8 md:p-10 rounded-[35px] md:rounded-[40px] border hover:translate-x-2 transition-all duration-500`}>
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className={`text-[10px] md:text-xs font-mono font-bold opacity-40`}>{post.date}</span>
                                        <div className={`w-1 h-1 rounded-full ${pointBg}`} />
                                        <div className="flex gap-2">
                                            {post.tags.map(tag => (
                                                <span key={tag} className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${pointColor}`}>#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs"><MessageSquare size={14} /> 12</div>
                                        <div className="flex items-center gap-1.5 text-[10px] md:text-xs"><BookOpen size={14} /> 5 min read</div>
                                    </div>
                                </div>
                                <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-yellow-400 transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="opacity-50 text-xs md:text-base font-light leading-relaxed line-clamp-2 md:line-clamp-none">
                                    {post.excerpt}
                                </p>
                                <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                    READ ARTICLE <ArrowUpRight size={14} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
