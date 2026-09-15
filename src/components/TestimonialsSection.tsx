import React from 'react';
import {useContent} from '../admin/content';
import { MessageSquare, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  const reviews = useContent<{id:string;name:string;company:string;quote:string}>('testimonials',[]);
  if(reviews.length) return <section className="py-20 px-6 bg-[#060A1C]"><h2 className="text-3xl text-center mb-10">Client feedback</h2><div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">{reviews.map(r=><blockquote key={r.id} className="rounded-2xl p-7 border border-white/10"><p className="text-lg mb-6">“{r.quote}”</p><footer>{r.name}<span className="block text-gray-400">{r.company}</span></footer></blockquote>)}</div></section>;
  return (
    <section id="testimonials" className="relative py-16 bg-[#060A1C] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified feedback only</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-['Space_Grotesk',sans-serif] text-white">CLIENT REVIEWS WITHOUT FAKE QUOTES</h2>
        <p className="mt-3 text-sm text-gray-400 max-w-2xl mx-auto">We only publish client feedback after approval. Until verified reviews are added, this website does not display invented testimonials, ratings, or performance claims.</p>
        <a href={getWhatsAppUrl('Hi Nexa Loops, I would like to see relevant portfolio examples or verified references for my project.')} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-sm font-semibold text-white transition-colors">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          Ask for relevant work examples
        </a>
      </div>
    </section>
  );
};
