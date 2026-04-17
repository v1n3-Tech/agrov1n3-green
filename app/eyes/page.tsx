import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgroV1n3 Magazine | Green V1n3 Nigeria',
  description: 'Premium editorial on AgroV1n3: transforming Nigeria\'s agricultural future through massive youth participation and economic empowerment',
}

export default function AgroV1n3Magazine() {
  return (
    <main className="w-full bg-black text-white">
      {/* PAGE 1: Cover/Hero */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center justify-center overflow-hidden">
        <img
          src="/eyes-hero.jpg"
          alt="AgroV1n3 Initiative - Young Farmers in Nigeria"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        
        <div className="relative z-10 w-full px-[15mm] py-[20mm] text-center flex flex-col justify-center h-full">
          <div className="mb-8">
            <span className="text-xs tracking-[4px] uppercase text-green-400 font-medium">
              Initiative by Mantim Danzaki
            </span>
          </div>
          
          <h1 className="text-[72pt] font-bold mb-6 leading-none tracking-tight">
            AgroV1n3
          </h1>
          
          <p className="text-[14pt] font-light leading-relaxed mb-12 text-gray-200 max-w-[160mm] mx-auto">
            Translating our collective dream of a better Nigeria through massive youth participation in the agriculture value chain
          </p>
          
          <div className="flex items-center justify-center gap-16 mt-auto mb-[30mm]">
            <div className="text-center">
              <div className="text-[36pt] font-bold text-green-400">10,000+</div>
              <p className="text-gray-300 text-[10pt]">Youth in Phase 1</p>
            </div>
            <div className="w-px h-16 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-[36pt] font-bold text-orange-500">14</div>
              <p className="text-gray-300 text-[10pt]">Agriculture Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 2: Vision Statement */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col justify-center overflow-hidden">
        <h2 className="text-[32pt] font-bold mb-6 leading-tight">
          A <span className="text-green-400">Paradigm Shift</span> in Agricultural Development
        </h2>
        <div className="w-24 h-1 bg-green-500 mb-8"></div>
        <p className="text-[12pt] text-gray-400 mb-8 font-light leading-relaxed">
          AgroV1n3 stands as the foundation upon which multiple transformative projects converge. It represents a fundamental reimagining of how Nigeria can harness its greatest asset: the energy, innovation, and ambition of its youth.
        </p>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-[11pt] text-gray-300 leading-relaxed">
              With an estimated 10,000 youths in Plateau State as initial participants, the first phase of AgroV1n3 represents the largest coordinated agricultural empowerment initiative of its kind. Each participant—referred to as an Agro Executive—gains access to comprehensive training, market opportunities, and financial tools.
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-[11pt] text-gray-300 leading-relaxed">
              The platform creates an ecosystem where young farmers don't just work the land—they own their economic destiny. Through V1n3 tokenization, blockchain transparency, and direct market access, Agro Executives build sustainable livelihoods while strengthening Nigeria's agricultural sector.
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 3: Communities Image */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-communities.jpg"
          alt="14 Agriculture Communities of GreenV1n3"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>
        
        <div className="relative z-10 w-[90mm] ml-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            Fourteen <span className="text-orange-500">Communities</span>
          </h3>
          <p className="text-[10pt] text-gray-200 mb-6 font-light leading-relaxed">
            Every agricultural pursuit finds its home within GreenV1n3's ecosystem. From crop farming to agro-technology, participants select their community and begin their journey.
          </p>
          <div className="space-y-2 text-[9pt] text-gray-300">
            <p>Crop Farming • Animal Farming • Agro Marketing</p>
            <p>Agro Processing • Agro Management & Legislation</p>
            <p>Agro Tourism • Agro Technology • Agro Health Care</p>
            <p>Agro Media & Branding • Agro Security</p>
            <p>Agro Literature • Agro Motivation & Training</p>
            <p>Agro Real Estate • Agro Logistics</p>
          </div>
        </div>
      </section>

      {/* PAGE 4: Platform Features */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <h2 className="text-[28pt] font-bold mb-2 leading-tight">
          <span className="text-green-400">Green V1n3</span>: The Platform
        </h2>
        <div className="w-20 h-1 bg-green-500 mb-6"></div>
        
        <div className="grid grid-cols-2 gap-6 flex-1">
          {[
            { title: 'Personal Profile', description: 'Interactive pages featuring word, photo, music, and video capabilities. Showcase your agricultural journey and connect with millions of participants.' },
            { title: 'Agro-Online Shop', description: 'Direct marketplace access to sell your agricultural products and services. Reach consumers across Nigeria and beyond with transparent, fair pricing.' },
            { title: 'Investment Platform', description: 'Connect with investors seeking agricultural opportunities. Present your business case and secure funding for growth and expansion.' },
            { title: 'Personal Wallet', description: 'V1n3 token-based digital wallet. Manage earnings, make payments, and track financial growth in real-time with blockchain security.' },
            { title: 'Weekly Ratings', description: 'Transparent performance evaluation. Your financial progress and operational metrics are tracked weekly, enabling continuous improvement.' },
            { title: 'News & Updates', description: 'Stay informed with agriculture and economic news. Access market insights, pricing trends, and industry developments affecting your business.' }
          ].map((feature, idx) => (
            <div key={idx} className="border border-gray-800 p-5 rounded-sm">
              <h3 className="text-[12pt] font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-[9pt] text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 5: Impact/Vision Image */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-impact.jpg"
          alt="Success Stories - Young Agro Entrepreneurs"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>
        
        <div className="relative z-10 w-[85mm] ml-auto mr-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-6 leading-tight">
            Three-Year <span className="text-green-400">Vision</span>
          </h3>
          <div className="space-y-5">
            <div>
              <div className="text-[24pt] font-bold text-orange-500">60%</div>
              <p className="text-[10pt] text-gray-200">Patronage of Local Agro Products</p>
            </div>
            <div>
              <div className="text-[24pt] font-bold text-green-400">1,000+</div>
              <p className="text-[10pt] text-gray-200">New Agro Millionaires Per LGA</p>
            </div>
            <div>
              <div className="text-[24pt] font-bold text-orange-500">30%</div>
              <p className="text-[10pt] text-gray-200">Nigerians Lifted Out of Poverty</p>
            </div>
            <p className="text-[9pt] text-gray-300 leading-relaxed pt-4 border-t border-gray-600">
              These are measurable, achievable outcomes built on proven models of economic participation and genuine youth empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 6: Operational Structure */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <h2 className="text-[28pt] font-bold mb-2 leading-tight">
          Operational <span className="text-orange-500">Architecture</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mb-6"></div>
        
        <div className="space-y-5 flex-1">
          {[
            { role: 'LGPA', title: 'Local Government Program Administrators', description: 'Selected youth delegates from each of the 17 local governments. Responsible for mobilizing and managing Agro Executives.' },
            { role: 'GCM', title: 'Green V1n3 Community Managers', description: 'Appointed by LGPAs to manage participants at grouping level. Every community has specialized GCMs ensuring localized support.' },
            { role: 'LGPAF', title: 'LG Program Administrators Forum', description: 'Quarterly gathering of all LGPAs for performance appraisal, experience sharing, and strategic alignment.' },
            { role: 'SCC', title: 'State Coordinating Council', description: 'Central governance body overseeing all AgroV1n3 activities across Plateau State and beyond.' },
            { role: 'AE', title: 'Agro Executives', description: 'Thousands of young Nigerians registered on GreenV1n3, trained and empowered to build sustainable livelihoods.' }
          ].map((item, idx) => (
            <div key={idx} className="border-l-4 border-green-500 pl-6 py-2">
              <p className="text-[8pt] font-bold tracking-wider text-orange-500 mb-1 uppercase">{item.role}</p>
              <h3 className="text-[14pt] font-bold mb-1">{item.title}</h3>
              <p className="text-[9pt] text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 7: Success Drivers */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <h2 className="text-[28pt] font-bold mb-2 leading-tight">
          Path to <span className="text-green-400">Sustainable Success</span>
        </h2>
        <div className="w-20 h-1 bg-green-500 mb-8"></div>
        
        <div className="grid grid-cols-2 gap-8 flex-1">
          {[
            { letter: 'A', title: 'Ownership & Benefits', description: 'Nigerian youth own shares in the program. Every effort translates directly into profit and royalty benefits, aligning individual success with program success.' },
            { letter: 'B', title: 'Non-Partisan Clarity', description: 'Free from political, religious, ethnic, or social manipulation. A unified vision drives all stakeholders with consistent excitement and shared expectations.' },
            { letter: 'C', title: 'Communication Excellence', description: 'Civil, simple, clear, and consistent communication. All hostile language is prohibited. Intents are properly understood across all stakeholder levels.' },
            { letter: 'D', title: 'Strategic Mobilization', description: 'A proven 7-step protocol: Identify → Isolate → Inform → Invite → Initiate → Involve → Introduce. Ensures thoughtful, respectful participant recruitment.' }
          ].map((item, idx) => (
            <div key={idx} className="relative pl-12">
              <div className="absolute left-0 top-0 text-[36pt] font-bold text-green-500/30">{item.letter}</div>
              <h3 className="text-[14pt] font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-[10pt] text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 8: Platform Technology */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-platform.jpg"
          alt="GreenV1n3 Platform Technology"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        
        <div className="relative z-10 w-[90mm] ml-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            Built on <span className="text-green-400">Trust</span> & <span className="text-orange-500">Transparency</span>
          </h3>
          <p className="text-[10pt] text-gray-200 mb-4 font-light leading-relaxed">
            GreenV1n3 leverages Solana blockchain technology for transparent transactions, secure wallet management, and immutable record-keeping.
          </p>
          <p className="text-[10pt] text-gray-200 font-light leading-relaxed">
            Every transaction, every rating, every record is permanently stored and verifiable. This creates unprecedented trust between participants, investors, and the marketplace.
          </p>
        </div>
      </section>

      {/* PAGE 9: Closing Vision */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col justify-center items-center text-center overflow-hidden">
        <h2 className="text-[36pt] font-bold mb-8 leading-tight">
          A New <span className="text-green-400">Agricultural</span> Economy
        </h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
        <p className="text-[12pt] text-gray-300 mb-8 leading-relaxed font-light max-w-[160mm]">
          AgroV1n3 is not merely a program. It is the blueprint for a fundamentally transformed Nigeria—where young people see agriculture as the pathway to prosperity, where local products are celebrated and consumed, where opportunity is equitably distributed, and where economic empowerment is a tangible reality.
        </p>
        <p className="text-[11pt] text-gray-400 font-light">
          An Initiative by <span className="text-orange-500 font-semibold">Mantim Danzaki</span>
        </p>
        
        <div className="mt-auto pt-16 border-t border-gray-800 w-full">
          <p className="text-[8pt] text-gray-500">© 2026 AgroV1n3 Initiative | Green V1n3 Nigeria</p>
          <p className="text-[8pt] text-gray-600">Transforming Nigeria's Agricultural Future Through Youth</p>
        </div>
      </section>
    </main>
  )
}
