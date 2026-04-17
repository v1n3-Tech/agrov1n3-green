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
          src="/eyes-greenhouse.png"
          alt="Modern AgroV1n3 Agricultural Facility"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        
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
              The platform creates an ecosystem where young farmers don&apos;t just work the land—they own their economic destiny. Through V1n3 tokenization, blockchain transparency, and direct market access, Agro Executives build sustainable livelihoods while strengthening Nigeria&apos;s agricultural sector.
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 3: The Agro Executive */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-executive.png"
          alt="AgroV1n3 Executive using tablet in the field"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 w-[85mm] ml-auto mr-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            The <span className="text-green-400">Agro Executive</span>
          </h3>
          <p className="text-[10pt] text-gray-200 mb-4 font-light leading-relaxed">
            Agro Executives are the thousands of young Nigerians who register, participate, and benefit from the AgroV1n3 program. They are trained to participate in any of the 14 agriculture value chains on the GreenV1n3 platform.
          </p>
          <div className="space-y-3 text-[9pt] text-gray-300">
            <p className="font-semibold text-white">Expectations:</p>
            <p>• Fill the AgroV1n3 registration card</p>
            <p>• Choose and register in any agriculture community</p>
            <p>• Attend introductory training</p>
            <p>• Create a Solana wallet</p>
            <p>• Advertise one new agro product monthly</p>
          </div>
        </div>
      </section>

      {/* PAGE 4: Communities Image */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-processing.jpg"
          alt="AgroV1n3 Processing Facility"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30"></div>
        
        <div className="relative z-10 w-[90mm] ml-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            Fourteen <span className="text-orange-500">Communities</span>
          </h3>
          <p className="text-[10pt] text-gray-200 mb-6 font-light leading-relaxed">
            Every agricultural pursuit finds its home within GreenV1n3&apos;s ecosystem. From crop farming to agro-technology, participants select their community and begin their journey.
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

      {/* PAGE 5: Platform Features */}
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

      {/* PAGE 6: Marketplace */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-end overflow-hidden">
        <img
          src="/eyes-marketplace.jpg"
          alt="AgroV1n3 Agricultural Marketplace"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        
        <div className="relative z-10 w-full px-[15mm] pb-[20mm] bg-black/60 pt-8">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            The <span className="text-orange-500">Agro Marketplace</span>
          </h3>
          <div className="grid grid-cols-2 gap-8">
            <p className="text-[10pt] text-gray-200 font-light leading-relaxed">
              The GreenV1n3 marketplace connects Agro Executives directly with consumers and buyers across Nigeria. Digital payments through V1n3 tokens enable instant, secure transactions while eliminating middlemen who traditionally capture value from farmers.
            </p>
            <p className="text-[10pt] text-gray-200 font-light leading-relaxed">
              Each LGA will have a registered agriculture and processing company serving as the operational nucleus for all Agro Executives. These companies handle production, processing, and logistics, ensuring quality standards and market access for all participants.
            </p>
          </div>
        </div>
      </section>

      {/* PAGE 7: Impact/Vision */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col justify-center overflow-hidden">
        <h2 className="text-[32pt] font-bold mb-8 leading-tight text-center">
          Three-Year <span className="text-green-400">Expected Outcomes</span>
        </h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-12"></div>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="text-center border border-gray-800 p-8 rounded">
            <div className="text-[48pt] font-bold text-orange-500 mb-2">60%</div>
            <p className="text-[12pt] text-gray-200 font-medium">Patronage of Local Agro Products</p>
            <p className="text-[9pt] text-gray-400 mt-2">Nigerians choosing locally produced agricultural goods</p>
          </div>
          <div className="text-center border border-gray-800 p-8 rounded">
            <div className="text-[48pt] font-bold text-green-400 mb-2">1,000+</div>
            <p className="text-[12pt] text-gray-200 font-medium">New Agro Millionaires Per LGA</p>
            <p className="text-[9pt] text-gray-400 mt-2">Creating wealth across all 17 local governments</p>
          </div>
          <div className="text-center border border-gray-800 p-8 rounded">
            <div className="text-[48pt] font-bold text-orange-500 mb-2">30%</div>
            <p className="text-[12pt] text-gray-200 font-medium">Nigerians Lifted Out of Poverty</p>
            <p className="text-[9pt] text-gray-400 mt-2">Economic transformation through agricultural prosperity</p>
          </div>
          <div className="text-center border border-gray-800 p-8 rounded">
            <div className="text-[48pt] font-bold text-green-400 mb-2">NEW</div>
            <p className="text-[12pt] text-gray-200 font-medium">Agriculture Markets Across Africa</p>
            <p className="text-[9pt] text-gray-400 mt-2">Expanding reach beyond Nigeria&apos;s borders</p>
          </div>
        </div>
      </section>

      {/* PAGE 8: Training */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-training.jpg"
          alt="AgroV1n3 Training Session"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        
        <div className="relative z-10 w-[90mm] ml-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            Training & <span className="text-green-400">Development</span>
          </h3>
          <p className="text-[10pt] text-gray-200 mb-4 font-light leading-relaxed">
            Every Agro Executive undergoes comprehensive training aligned with their chosen community. From modern farming techniques to digital marketing, financial management to blockchain literacy—participants are equipped for success.
          </p>
          <div className="space-y-2 text-[9pt] text-gray-300">
            <p className="font-semibold text-white">Benefits as Agro Executive:</p>
            <p>• Be part of a new economic growth in Nigeria</p>
            <p>• Develop and showcase talents to millions</p>
            <p>• Access to multiple investors</p>
            <p>• Access to new markets and customers</p>
            <p>• Make predictable profits</p>
            <p>• Increase in financial income</p>
            <p>• Access to trainings on new ideas</p>
          </div>
        </div>
      </section>

      {/* PAGE 9: Operational Structure */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <h2 className="text-[28pt] font-bold mb-2 leading-tight">
          Operational <span className="text-orange-500">Architecture</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mb-6"></div>
        
        <div className="space-y-5 flex-1">
          {[
            { role: 'LGPA', title: 'Local Government Program Administrators', description: 'Selected youth delegates from each of the 17 local governments. Responsible for mobilizing and managing Agro Executives. They sign an MOU with the SCC and manage communities under their LGA.' },
            { role: 'GCM', title: 'Green V1n3 Community Managers', description: 'Appointed by LGPAs to manage participants at grouping level. Every community has specialized GCMs ensuring localized support and guidance.' },
            { role: 'LGPAF', title: 'LG Program Administrators Forum', description: 'Regular gathering of all LGPAs from all 17 local governments for performance appraisal, experience sharing, and strategic alignment. Headed by a chairperson.' },
            { role: 'SCC', title: 'State Coordinating Council', description: 'Central governance body overseeing all AgroV1n3 activities across Plateau State and beyond. Sets policy and ensures program integrity.' },
            { role: 'AE', title: 'Agro Executives', description: 'Thousands of young Nigerians registered on GreenV1n3, trained and empowered to build sustainable agricultural livelihoods.' }
          ].map((item, idx) => (
            <div key={idx} className="border-l-4 border-green-500 pl-6 py-2">
              <p className="text-[8pt] font-bold tracking-wider text-orange-500 mb-1 uppercase">{item.role}</p>
              <h3 className="text-[14pt] font-bold mb-1">{item.title}</h3>
              <p className="text-[9pt] text-gray-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PAGE 10: Investment */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-investment.jpg"
          alt="AgroV1n3 Investment and Processing Facility"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-transparent"></div>
        
        <div className="relative z-10 w-[90mm] ml-auto mr-[12mm] bg-black/70 p-8 rounded">
          <h3 className="text-[28pt] font-bold mb-4 leading-tight">
            Funding & <span className="text-orange-500">Investment</span>
          </h3>
          <p className="text-[10pt] text-gray-200 mb-4 font-light leading-relaxed">
            AgroV1n3 creates structured investment opportunities across the agricultural value chain. V1n3 Token (Solana-based) enables transparent, secure transactions and investment tracking.
          </p>
          <div className="space-y-2 text-[9pt] text-gray-300">
            <p className="font-semibold text-white">Areas of Investment:</p>
            <p>• Production - Farm inputs and operations</p>
            <p>• Processing - Value addition facilities</p>
            <p>• Research & Development - Innovation</p>
            <p>• Training - Capacity building programs</p>
            <p>• Marketing & Publicity - Brand building</p>
            <p>• Facilities - Infrastructure development</p>
            <p>• Policy - Advocacy and compliance</p>
          </div>
        </div>
      </section>

      {/* PAGE 11: Success Drivers */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <h2 className="text-[28pt] font-bold mb-2 leading-tight">
          Path to <span className="text-green-400">Sustainable Success</span>
        </h2>
        <div className="w-20 h-1 bg-green-500 mb-8"></div>
        
        <p className="text-[10pt] text-gray-400 mb-6 leading-relaxed">
          Several great projects have been initiated in Nigeria but were not sustained. AgroV1n3 is designed with a success-driven module targeting a minimum 65% success rate in the first 3 years.
        </p>
        
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

      {/* PAGE 12: Closing Vision */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col justify-center items-center text-center overflow-hidden">
        <h2 className="text-[36pt] font-bold mb-8 leading-tight">
          A New <span className="text-green-400">Agricultural</span> Economy
        </h2>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-8"></div>
        <p className="text-[12pt] text-gray-300 mb-6 leading-relaxed font-light max-w-[160mm]">
          AgroV1n3 is not merely a program. It is the blueprint for a fundamentally transformed Nigeria—where young people see agriculture as the pathway to prosperity, where local products are celebrated and consumed, where opportunity is equitably distributed, and where economic empowerment is a tangible reality.
        </p>
        <p className="text-[11pt] text-gray-300 mb-8 leading-relaxed font-light max-w-[160mm]">
          The success of this program is greatly tied to large youth involvement and participation. All stakeholders, especially LGPAs, are expected to effectively sell the concept to thousands of youth in their LGAs using the mobilization protocol.
        </p>
        <p className="text-[14pt] text-gray-200 font-light mb-4">
          An Initiative by <span className="text-orange-500 font-semibold">Mantim Danzaki</span>
        </p>
        
        <div className="mt-auto pt-16 border-t border-gray-800 w-full">
          <p className="text-[8pt] text-gray-500">© 2026 AgroV1n3 Initiative | Green V1n3 Nigeria</p>
          <p className="text-[8pt] text-gray-600">Transforming Nigeria&apos;s Agricultural Future Through Youth</p>
        </div>
      </section>
    </main>
  )
}
