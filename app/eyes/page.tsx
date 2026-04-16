import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgroV1n3 Magazine | Green V1n3 Nigeria',
  description: 'Premium editorial on AgroV1n3: transforming Nigeria\'s agricultural future through massive youth participation and economic empowerment',
}

export default function AgroV1n3Magazine() {
  return (
    <main className="w-full bg-black text-white">
      <style>{`
        @media print {
          main { background: black; }
          body { margin: 0; padding: 0; }
          html { margin: 0; padding: 0; }
          section { page-break-inside: avoid; break-inside: avoid; }
          img { page-break-inside: avoid; break-inside: avoid; }
          h1, h2, h3 { page-break-after: avoid; }
          .print-page-break { page-break-after: always; break-after: page; }
        }
      `}</style>

      {/* PAGE 1: Hero Section */}
      <section className="relative w-full bg-black py-32 px-8 md:px-16">
        <div className="absolute inset-0 opacity-10">
          <img src="/eyes-hero.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <span className="text-xs md:text-sm font-light tracking-[3px] uppercase text-green-400">
              Initiative by Mantim Danzaki
            </span>
          </div>
          
          <h1 className="text-8xl md:text-9xl font-bold mb-8 leading-[1] tracking-tight">
            AgroV1n3
          </h1>
          
          <p className="text-lg md:text-2xl font-light leading-relaxed mb-16 text-gray-200 max-w-3xl mx-auto">
            Translating our collective dream of a better Nigeria through massive youth participation in the agriculture value chain
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <div>
              <div className="text-6xl md:text-7xl font-bold text-green-400 mb-3">10,000+</div>
              <p className="text-gray-300 text-lg">Youth Entrepreneurs in Phase 1</p>
            </div>
            <div className="hidden md:block w-px h-20 bg-gray-600"></div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-orange-500 mb-3">14</div>
              <p className="text-gray-300 text-lg">Agricultural Communities</p>
            </div>
          </div>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 2: Vision Section */}
      <section className="bg-black py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-gray-800 pt-16 pb-20">
            <h2 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              A <span className="text-green-400">Paradigm Shift</span> in Agricultural Development
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl font-light leading-relaxed">
              AgroV1n3 stands as the foundation upon which multiple transformative projects converge. It represents a fundamental reimagining of how Nigeria can harness its greatest asset: the energy, innovation, and ambition of its youth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 pb-20">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                With an estimated 10,000 youths in Plateau State as initial participants, the first phase of AgroV1n3 represents the largest coordinated agricultural empowerment initiative of its kind. Each participant—referred to as an Agro Executive—gains access to comprehensive training, market opportunities, and financial tools.
              </p>
            </div>
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                The platform creates an ecosystem where young farmers don't just work the land—they own their economic destiny. Through V1n3 tokenization, blockchain transparency, and direct market access, Agro Executives build sustainable livelihoods while strengthening Nigeria's agricultural sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 3: Communities Image + Section */}
      <section className="bg-black py-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <img src="/eyes-communities.jpg" alt="14 Agriculture Communities" className="w-full h-auto rounded-sm mb-12" />
          
          <div className="max-w-3xl">
            <h3 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              Fourteen <span className="text-orange-500">Communities</span>
            </h3>
            <p className="text-xl text-gray-200 mb-12 font-light leading-relaxed">
              Every agricultural pursuit finds its home within GreenV1n3's ecosystem. From crop farming to agro-technology, from animal husbandry to agro-tourism, participants select their community and begin their journey toward prosperity.
            </p>
            
            <div className="space-y-3 text-lg text-gray-300">
              <p>Crop Farming • Animal Farming • Agro Marketing</p>
              <p>Agro Processing • Agro Management & Legislation</p>
              <p>Agro Tourism • Agro Technology • Agro Health Care</p>
              <p>Agro Media & Branding • Agro Security</p>
              <p>Agro Literature • Agro Motivation & Training</p>
              <p>Agro Real Estate • Agro Logistics</p>
            </div>
          </div>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 4: Platform Features Grid */}
      <section className="bg-black py-24 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-16 leading-tight pb-8 border-b border-gray-800">
            <span className="text-green-400">Green V1n3 Nigeria</span>: The Multifunctional Platform
          </h2>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Personal Profile',
                description: 'Interactive pages featuring word, photo, music, and video capabilities. Showcase your agricultural journey and connect with millions of participants.'
              },
              {
                title: 'Agro-Online Shop',
                description: 'Direct marketplace access to sell your agricultural products and services. Reach consumers across Nigeria and beyond with transparent, fair pricing.'
              },
              {
                title: 'Investment Platform',
                description: 'Connect with investors seeking agricultural opportunities. Present your business case and secure funding for growth and expansion.'
              },
              {
                title: 'Personal Wallet',
                description: 'V1n3 token-based digital wallet. Manage earnings, make payments, and track financial growth in real-time with blockchain security.'
              },
              {
                title: 'Weekly Ratings',
                description: 'Transparent performance evaluation. Your financial progress and operational metrics are tracked weekly, enabling continuous improvement.'
              },
              {
                title: 'News & Updates',
                description: 'Stay informed with agriculture and economic news. Access market insights, pricing trends, and industry developments affecting your business.'
              }
            ].map((feature, idx) => (
              <div key={idx} className="space-y-5 border border-gray-800 p-8 rounded-sm">
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 5: Impact Image + Vision */}
      <section className="bg-black py-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <img src="/eyes-impact.jpg" alt="Success Stories" className="w-full h-auto rounded-sm mb-12" />
          
          <h3 className="text-6xl md:text-7xl font-bold mb-12 leading-tight">
            Three-Year <span className="text-green-400">Vision</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-3xl">
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-3">60%</div>
              <p className="text-lg text-gray-200">Patronage of Local Agro Products</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-400 mb-3">1,000+</div>
              <p className="text-lg text-gray-200">New Agro Millionaires Per Local Government</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-3">30%</div>
              <p className="text-lg text-gray-200">Nigerians Lifted Out of Poverty</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-300 leading-relaxed mt-12 pt-8 border-t border-gray-700">
            These are not aspirational targets. They are measurable, achievable outcomes built on proven models of economic participation, transparent governance, and genuine youth empowerment.
          </p>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 6: Operational Structure */}
      <section className="bg-black py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-16 leading-tight pb-8 border-b border-gray-800">
            Operational <span className="text-orange-500">Architecture</span>
          </h2>
          
          <div className="space-y-14">
            {[
              {
                role: 'LGPA',
                title: 'Local Government Program Administrators',
                description: 'Selected youth delegates from each of the 17 local governments in Plateau State. Responsible for mobilizing and managing Agro Executives. Serve as Local Government Admins across the 14 communities.'
              },
              {
                role: 'GCM',
                title: 'Green V1n3 Community Managers',
                description: 'Appointed by LGPAs to manage all participants at the grouping level. Every community has specialized GCMs ensuring localized support, mentorship, and conflict resolution.'
              },
              {
                role: 'LGPAF',
                title: 'Local Government Program Administrators Forum',
                description: 'A quarterly gathering of all LGPAs across the 17 local governments. A critical venue for performance appraisal, experience sharing, and strategic alignment under a rotating chairperson.'
              },
              {
                role: 'SCC',
                title: 'State Coordinating Council',
                description: 'The central governance body overseeing all AgroV1n3 activities across Plateau State and beyond. Ensures consistency of vision, policy implementation, and quality assurance.'
              },
              {
                role: 'AGRO EXECUTIVES',
                title: 'The Heart of the Movement',
                description: 'Thousands of young Nigerians registered on GreenV1n3, participating in their chosen agricultural community. Trained, supported, and empowered to build sustainable livelihoods and transform Nigeria\'s agricultural sector.'
              }
            ].map((item, idx) => (
              <div key={idx} className="border-l-4 border-green-500 pl-10 py-4">
                <p className="text-xs font-bold tracking-wider text-orange-500 mb-2 uppercase">{item.role}</p>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 7: Success Drivers */}
      <section className="bg-black py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-16 leading-tight pb-8 border-b border-gray-800">
            The Path to <span className="text-green-400">Sustainable Success</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-14">
            {[
              {
                letter: 'A',
                title: 'Ownership & Benefits',
                description: 'Nigerian youth own shares in the program. Every effort translates directly into profit and royalty benefits, aligning individual success with program success.'
              },
              {
                letter: 'B',
                title: 'Non-Partisan Clarity',
                description: 'Free from political, religious, ethnic, or social manipulation. A unified vision drives all stakeholders with consistent excitement and shared expectations.'
              },
              {
                letter: 'C',
                title: 'Communication Excellence',
                description: 'Civil, simple, clear, and consistent communication. All hostile language is prohibited. Intents are properly understood across all stakeholder levels.'
              },
              {
                letter: 'D',
                title: 'Strategic Mobilization',
                description: 'A proven 7-step protocol: Identify → Isolate → Inform → Invite → Initiate → Involve → Introduce. Ensures thoughtful, respectful participant recruitment.'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-16">
                <div className="absolute left-0 top-0 text-5xl font-bold text-green-500/30">{item.letter}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-base text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 8: Platform Technology */}
      <section className="bg-black py-20 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <img src="/eyes-platform.jpg" alt="GreenV1n3 Platform" className="w-full h-auto rounded-sm mb-12" />
          
          <h3 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Built on <span className="text-green-400">Trust</span> & <span className="text-orange-500">Transparency</span>
          </h3>
          <p className="text-xl text-gray-200 font-light leading-relaxed">
            GreenV1n3 leverages Solana blockchain technology for transparent transactions, secure wallet management, and immutable record-keeping. Every transaction, every rating is recorded and verifiable.
          </p>
        </div>
      </section>

      <div className="print-page-break"></div>

      {/* PAGE 9: Closing Vision */}
      <section className="bg-black py-32 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-7xl md:text-8xl font-bold mb-12 leading-tight">
            A New <span className="text-green-400">Agricultural</span> Economy
          </h2>
          <p className="text-2xl text-gray-300 mb-10 leading-relaxed font-light max-w-4xl mx-auto">
            AgroV1n3 is not merely a program. It is the blueprint for a fundamentally transformed Nigeria—where young people see agriculture as the pathway to prosperity, where local products are celebrated and consumed, where opportunity is equitably distributed, and where economic empowerment is a tangible reality.
          </p>
          <p className="text-xl text-gray-400 font-light">
            The initiative is by <span className="text-orange-500 font-semibold">Mantim Danzaki</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-gray-950 border-t border-gray-800 py-12 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-500 text-xs font-light">
          <p>© 2026 AgroV1n3 Initiative | Green V1n3 Nigeria</p>
          <p>Transforming Nigeria's Agricultural Future Through Youth</p>
        </div>
      </section>
    </main>
  )
}
