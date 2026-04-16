import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgroV1n3 Magazine | Green V1n3 Nigeria',
  description: 'Premium editorial on AgroV1n3: transforming Nigeria\'s agricultural future through massive youth participation and economic empowerment',
}

export default function AgroV1n3Magazine() {
  return (
    <main className="w-full bg-black text-white overflow-hidden">
      {/* Full-Width Hero with Overlay */}
      <section className="relative w-full h-[120vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/agrov1n3-hero.jpg"
          alt="AgroV1n3 Initiative - Young Farmers in Nigeria"
          fill
          className="object-cover absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-8 md:px-16 py-48 text-center">
          <div className="mb-12 inline-block">
            <span className="text-sm md:text-base font-light tracking-[3px] uppercase text-green-400">
              Initiative by Mantim Danzaki
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold mb-8 leading-[1.1] tracking-tight">
            AgroV1n3
          </h1>
          
          <p className="text-xl md:text-2xl font-light leading-relaxed mb-16 text-gray-200 max-w-3xl mx-auto">
            Translating our collective dream of a better Nigeria through massive youth participation in the agriculture value chain
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32">
            <div>
              <div className="text-6xl md:text-7xl font-bold text-green-400 mb-3">10,000+</div>
              <p className="text-gray-300 text-lg">Youth Entrepreneurs in Phase 1</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-gray-600"></div>
            <div>
              <div className="text-6xl md:text-7xl font-bold text-orange-500 mb-3">14</div>
              <p className="text-gray-300 text-lg">Agricultural Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Section Divider */}
      <section className="bg-black py-24 px-8 md:px-16">
        <div className="max-w-5xl mx-auto border-t border-gray-800 pt-24">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A <span className="text-green-400">Paradigm Shift</span> in Agricultural Development
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl font-light leading-relaxed">
            AgroV1n3 stands as the foundation upon which multiple transformative projects converge. It represents a fundamental reimagining of how Nigeria can harness its greatest asset: the energy, innovation, and ambition of its youth.
          </p>
          <div className="grid md:grid-cols-2 gap-12">
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

      {/* Full-Width Image Section */}
      <section className="relative w-full h-[90vh] flex items-center">
        <Image
          src="/images/agro-communities.jpg"
          alt="14 Agriculture Communities of GreenV1n3"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto md:ml-16 px-8">
          <h3 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Fourteen <span className="text-orange-500">Communities</span>
          </h3>
          <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed">
            Every agricultural pursuit finds its home within GreenV1n3's ecosystem. From crop farming to agro-technology, from animal husbandry to agro-tourism, participants select their community and begin their journey toward prosperity.
          </p>
          <div className="space-y-3">
            <p className="text-gray-300">Crop Farming • Animal Farming • Agro Marketing</p>
            <p className="text-gray-300">Agro Processing • Agro Management & Legislation</p>
            <p className="text-gray-300">Agro Tourism • Agro Technology • Agro Health Care</p>
            <p className="text-gray-300">Agro Media & Branding • Agro Security</p>
            <p className="text-gray-300">Agro Literature • Agro Motivation & Training</p>
            <p className="text-gray-300">Agro Real Estate • Agro Logistics</p>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="bg-black py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-24 leading-tight">
            <span className="text-green-400">Green V1n3 Nigeria</span>: The Multifunctional Platform
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
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
              <div key={idx} className="space-y-6 border border-gray-800 p-10 rounded-sm hover:border-green-500/50 transition-colors">
                <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section with Image */}
      <section className="relative w-full h-[100vh] flex items-center">
        <Image
          src="/images/agro-impact.jpg"
          alt="Success Stories - Young Agro Entrepreneurs"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl ml-auto mr-16 px-8">
          <h3 className="text-6xl md:text-7xl font-bold mb-10 leading-tight">
            Three-Year <span className="text-green-400">Vision</span>
          </h3>
          <div className="space-y-8">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">60%</div>
              <p className="text-xl text-gray-200">Patronage of Local Agro Products</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">1,000+</div>
              <p className="text-xl text-gray-200">New Agro Millionaires Per Local Government</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">30%</div>
              <p className="text-xl text-gray-200">Nigerians Lifted Out of Poverty</p>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed pt-6 border-t border-gray-700">
              These are not aspirational targets. They are measurable, achievable outcomes built on proven models of economic participation, transparent governance, and genuine youth empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Operational Structure */}
      <section className="bg-black py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-20 leading-tight">
            Operational <span className="text-orange-500">Architecture</span>
          </h2>
          
          <div className="space-y-16">
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
              <div key={idx} className="border-l-4 border-green-500 pl-10 py-6">
                <p className="text-sm font-bold tracking-wider text-orange-500 mb-3 uppercase">{item.role}</p>
                <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                <p className="text-lg text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Drivers */}
      <section className="bg-gradient-to-b from-black to-gray-900/20 py-32 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-20 leading-tight">
            The Path to <span className="text-green-400">Sustainable Success</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16">
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
              <div key={idx} className="relative pl-20">
                <div className="absolute left-0 top-0 text-6xl font-bold text-green-500/30">{item.letter}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-lg text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Technology Section */}
      <section className="relative w-full h-[80vh] flex items-center">
        <Image
          src="/images/greenvin3-platform.jpg"
          alt="GreenV1n3 Platform Technology"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-black/40"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto md:ml-16 px-8">
          <h3 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Built on <span className="text-green-400">Trust</span> & <span className="text-orange-500">Transparency</span>
          </h3>
          <p className="text-xl text-gray-200 mb-8 font-light leading-relaxed">
            GreenV1n3 leverages Solana blockchain technology for transparent transactions, secure wallet management, and immutable record-keeping. Every transaction, every rating, every transaction is recorded and verifiable.
          </p>
        </div>
      </section>

      {/* Closing Vision */}
      <section className="bg-black py-40 px-8 md:px-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-7xl md:text-8xl font-bold mb-12 leading-tight">
            A New <span className="text-green-400">Agricultural</span> Economy
          </h2>
          <p className="text-2xl text-gray-300 mb-8 leading-relaxed font-light">
            AgroV1n3 is not merely a program. It is the blueprint for a fundamentally transformed Nigeria—where young people see agriculture as the pathway to prosperity, where local products are celebrated and consumed, where opportunity is equitably distributed, and where economic empowerment is a tangible reality.
          </p>
          <p className="text-xl text-gray-400 font-light">
            The initiative is by <span className="text-orange-500 font-semibold">Mantim Danzaki</span>
          </p>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-gray-950 border-t border-gray-800 py-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm font-light">
          <p>© 2026 AgroV1n3 Initiative | Green V1n3 Nigeria</p>
          <p>Transforming Nigeria's Agricultural Future Through Youth</p>
        </div>
      </section>
    </main>
  )
}
