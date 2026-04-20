import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgroV1n3 Pitch Deck | Green V1n3 Nigeria',
  description: 'AgroV1n3: Empowering 10,000+ Nigerian youths through agriculture technology',
}

export default function AgroV1n3PitchDeck() {
  return (
    <main className="w-full bg-black text-white">
      {/* SLIDE 1: Cover */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center justify-center overflow-hidden">
        <img
          src="/eyes-greenhouse.png"
          alt="Modern AgroV1n3 Agricultural Facility"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        
        <div className="relative z-10 w-full px-[15mm] py-[20mm] text-center flex flex-col justify-center h-full">
          <div className="mb-4">
            <span className="text-[10pt] tracking-[3px] uppercase text-green-400 font-medium">
              Green V1n3 Nigeria
            </span>
          </div>
          
          <h1 className="text-[64pt] font-bold mb-4 leading-none tracking-tight">
            AGRO V1N3
          </h1>
          
          <p className="text-[16pt] font-light leading-relaxed mb-8 text-gray-200 max-w-[150mm] mx-auto">
            Agricultural Technology Platform for Youth Empowerment
          </p>
          
          <div className="bg-green-500/20 border border-green-500/40 rounded px-6 py-3 inline-block mx-auto mb-12">
            <p className="text-[12pt] text-green-400 font-medium">Empowering 10,000+ Nigerian Youths</p>
          </div>
          
          <div className="mt-auto mb-[20mm]">
            <p className="text-[10pt] text-gray-400">An Initiative by</p>
            <p className="text-[14pt] text-orange-500 font-semibold">Mantim Danzaki</p>
            <p className="text-[9pt] text-gray-500 mt-1">V1n3Tech, Jos, Plateau State</p>
          </div>
        </div>
      </section>

      {/* SLIDE 2: The Problem */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col overflow-hidden">
        <div className="text-[10pt] text-gray-500 mb-4">02</div>
        <h2 className="text-[36pt] font-bold mb-6 leading-tight">
          The <span className="text-orange-500">Problem</span>
        </h2>
        <div className="w-24 h-1 bg-orange-500 mb-8"></div>
        
        <p className="text-[18pt] text-gray-300 mb-12 font-light leading-relaxed">
          Nigeria&apos;s youth are abandoning agriculture
        </p>
        
        <div className="grid grid-cols-2 gap-8 flex-1">
          <div className="border border-gray-800 p-6 rounded">
            <div className="text-[24pt] text-orange-500 mb-3">01</div>
            <h3 className="text-[14pt] font-bold mb-2">Declining Participation</h3>
            <p className="text-[10pt] text-gray-400 leading-relaxed">Young Nigerians see no future in farming. Mass migration to cities for jobs leaves agricultural potential untapped.</p>
          </div>
          <div className="border border-gray-800 p-6 rounded">
            <div className="text-[24pt] text-orange-500 mb-3">02</div>
            <h3 className="text-[14pt] font-bold mb-2">No Modern Infrastructure</h3>
            <p className="text-[10pt] text-gray-400 leading-relaxed">Traditional farming lacks markets, payment systems, and technology. No platform connects young farmers to opportunities.</p>
          </div>
          <div className="border border-gray-800 p-6 rounded">
            <div className="text-[24pt] text-orange-500 mb-3">03</div>
            <h3 className="text-[14pt] font-bold mb-2">Untapped Potential</h3>
            <p className="text-[10pt] text-gray-400 leading-relaxed">Plateau State and nationwide, thousands of youths are ready to farm but lack the platform and ecosystem to succeed.</p>
          </div>
          <div className="border border-gray-800 p-6 rounded">
            <div className="text-[24pt] text-orange-500 mb-3">04</div>
            <h3 className="text-[14pt] font-bold mb-2">Economic Exclusion</h3>
            <p className="text-[10pt] text-gray-400 leading-relaxed">Youth unemployment remains high while agriculture—Africa&apos;s largest economic sector—goes underutilized.</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded text-center">
          <p className="text-[12pt] text-orange-400 font-medium">10,000+ youths ready to farm — but no modern platform exists.</p>
        </div>
      </section>

      {/* SLIDE 3: The Solution */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-executive.png"
          alt="AgroV1n3 Executive using tablet in the field"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
        
        <div className="relative z-10 w-[100mm] ml-[12mm]">
          <div className="text-[10pt] text-gray-500 mb-4">03</div>
          <h2 className="text-[36pt] font-bold mb-6 leading-tight">
            The <span className="text-green-400">Solution</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mb-8"></div>
          
          <h3 className="text-[24pt] font-bold text-white mb-4">Green V1n3</h3>
          
          <p className="text-[12pt] text-gray-200 mb-6 font-light leading-relaxed">
            A web platform designed to make agriculture profitable, connected, and exciting for Nigerian youth.
          </p>
          
          <div className="space-y-3 text-[10pt] text-gray-300">
            <p>• Digital marketplace for agricultural products</p>
            <p>• 14 specialized agriculture communities</p>
            <p>• Investment and funding platform</p>
            <p>• Personal profiles and wallet system</p>
            <p>• Training and development programs</p>
          </div>
          
          <div className="mt-8 p-4 bg-green-500/10 border border-green-500/30 rounded">
            <p className="text-[10pt] text-green-400">Platform UI: agrov1n3.vercel.app</p>
          </div>
        </div>
      </section>

      {/* SLIDE 4: Product Features */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <div className="text-[10pt] text-gray-500 mb-4">04</div>
        <h2 className="text-[32pt] font-bold mb-2 leading-tight">
          Product <span className="text-green-400">Features</span>
        </h2>
        <div className="w-20 h-1 bg-green-500 mb-6"></div>
        
        <div className="grid grid-cols-2 gap-5 flex-1">
          {[
            { icon: '01', title: 'Interactive Profile', description: 'Personal pages with media capabilities. Showcase your agricultural journey and connect with participants.' },
            { icon: '02', title: 'Agro Shop Marketplace', description: 'Buy and sell fresh produce directly. Transparent pricing without middlemen.' },
            { icon: '03', title: 'Investment Platform', description: 'Connect agricultural projects with investors. Track funding and returns.' },
            { icon: '04', title: 'Personal Wallet', description: 'Digital wallet concept for managing earnings and payments within the ecosystem.' },
            { icon: '05', title: '14 Specialized Communities', description: 'Crop Farming, Animal Farming, Agro Tech, Agro Processing, Agro Marketing, and 9 more.' },
            { icon: '06', title: 'Ratings & Analytics', description: 'Weekly performance tracking, leaderboards, and insights for continuous improvement.' }
          ].map((feature, idx) => (
            <div key={idx} className="border border-gray-800 p-5 rounded-sm">
              <div className="text-[18pt] text-green-500/50 font-bold mb-2">{feature.icon}</div>
              <h3 className="text-[12pt] font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-[9pt] text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SLIDE 5: How It Works */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col overflow-hidden">
        <div className="text-[10pt] text-gray-500 mb-4">05</div>
        <h2 className="text-[32pt] font-bold mb-2 leading-tight">
          How It <span className="text-orange-500">Works</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mb-10"></div>
        
        <div className="space-y-6 flex-1">
          {[
            { step: '1', title: 'Join a Community', description: '14 options including Crop Farming, Animal Farming, Agro Technology, Agro Processing, Agro Marketing, and more.' },
            { step: '2', title: 'Build Your Profile & Shop', description: 'Create your personal page, list agricultural products, advertise services, and connect with buyers.' },
            { step: '3', title: 'Connect with Investors', description: 'Present your agricultural projects to potential investors through the platform.' },
            { step: '4', title: 'Scale & Earn', description: 'Grow your agricultural business, access training, expand your market reach, and build sustainable income.' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-6 border-l-4 border-green-500 pl-6 py-4">
              <div className="text-[48pt] font-bold text-green-500/30 leading-none">{item.step}</div>
              <div>
                <h3 className="text-[16pt] font-bold mb-2">{item.title}</h3>
                <p className="text-[10pt] text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SLIDE 6: Market Opportunity */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-end overflow-hidden">
        <img
          src="/eyes-processing.jpg"
          alt="AgroV1n3 Processing Facility"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30"></div>
        
        <div className="relative z-10 w-full px-[15mm] pb-[20mm]">
          <div className="text-[10pt] text-gray-500 mb-4">06</div>
          <h2 className="text-[32pt] font-bold mb-6 leading-tight">
            Market <span className="text-green-400">Opportunity</span>
          </h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center p-6 bg-black/60 rounded border border-gray-800">
              <div className="text-[36pt] font-bold text-green-400">200M+</div>
              <p className="text-[10pt] text-gray-300">Nigeria population with massive youth demographic</p>
            </div>
            <div className="text-center p-6 bg-black/60 rounded border border-gray-800">
              <div className="text-[36pt] font-bold text-orange-500">10K+</div>
              <p className="text-[10pt] text-gray-300">Target youth participants in Phase 1 (Plateau State)</p>
            </div>
            <div className="text-center p-6 bg-black/60 rounded border border-gray-800">
              <div className="text-[36pt] font-bold text-green-400">17</div>
              <p className="text-[10pt] text-gray-300">Local Government Areas in Plateau State</p>
            </div>
          </div>
          
          <p className="text-[11pt] text-gray-300 leading-relaxed bg-black/60 p-4 rounded">
            AgriTech is one of Africa&apos;s fastest-growing sectors. Nigeria&apos;s agricultural market represents massive untapped potential, especially when combined with youth empowerment and digital technology.
          </p>
        </div>
      </section>

      {/* SLIDE 7: Communities */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[15mm] flex flex-col overflow-hidden">
        <div className="text-[10pt] text-gray-500 mb-4">07</div>
        <h2 className="text-[32pt] font-bold mb-2 leading-tight">
          14 <span className="text-orange-500">Communities</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mb-6"></div>
        
        <p className="text-[11pt] text-gray-400 mb-8 leading-relaxed">
          Every agricultural pursuit finds its home within GreenV1n3&apos;s ecosystem. Participants select their community based on interest and expertise.
        </p>
        
        <div className="grid grid-cols-2 gap-4 flex-1">
          {[
            'Crop Farming', 'Animal Farming', 'Agro Marketing', 'Agro Processing',
            'Agro Management & Legislation', 'Agro Tourism', 'Agro Technology', 'Agro Health Care',
            'Agro Media & Branding', 'Agro Security', 'Agro Literature', 'Agro Motivation & Training',
            'Agro Real Estate', 'Agro Logistics'
          ].map((community, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 border border-gray-800 rounded">
              <div className="w-8 h-8 bg-green-500/20 rounded flex items-center justify-center text-[10pt] text-green-400 font-bold">
                {String(idx + 1).padStart(2, '0')}
              </div>
              <p className="text-[11pt] text-white">{community}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SLIDE 8: Current Status & Traction */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-marketplace.jpg"
          alt="AgroV1n3 Marketplace"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/70 to-black/40"></div>
        
        <div className="relative z-10 w-[95mm] ml-auto mr-[12mm] bg-black/80 p-8 rounded">
          <div className="text-[10pt] text-gray-500 mb-4">08</div>
          <h2 className="text-[28pt] font-bold mb-6 leading-tight">
            Current <span className="text-green-400">Status</span>
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-[11pt] text-white">Platform UI built and live at agrov1n3.vercel.app</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-[11pt] text-white">Marketplace interface with product listings</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-[11pt] text-white">14 community pages designed</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-[11pt] text-white">Investment platform concept ready</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="text-[11pt] text-yellow-400">Wallet & blockchain integration planned</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
            <p className="text-[10pt] text-green-400 font-medium">Technology concept with functional UI — ready for development partnership</p>
          </div>
        </div>
      </section>

      {/* SLIDE 9: Team */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col overflow-hidden">
        <div className="text-[10pt] text-gray-500 mb-4">09</div>
        <h2 className="text-[32pt] font-bold mb-2 leading-tight">
          The <span className="text-orange-500">Team</span>
        </h2>
        <div className="w-20 h-1 bg-orange-500 mb-10"></div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div className="border border-gray-800 p-8 rounded mb-8">
            <h3 className="text-[24pt] font-bold text-white mb-2">Danzaki Mantim</h3>
            <p className="text-[12pt] text-green-400 mb-4">Founder & CEO</p>
            <p className="text-[11pt] text-gray-300 leading-relaxed mb-4">
              400-level Building Technology student at University of Jos. Passionate Agri-Tech builder from Plateau State with a vision to transform Nigerian agriculture through youth empowerment and technology.
            </p>
            <p className="text-[10pt] text-gray-500">WhatsApp: 09061130264</p>
          </div>
          
          <div className="border border-gray-800 p-6 rounded mb-8">
            <p className="text-[14pt] text-white font-medium mb-2">V1n3Tech</p>
            <p className="text-[10pt] text-gray-400 leading-relaxed">
              A Jos-based youth empowerment company focused on building technology solutions for agricultural transformation in Nigeria.
            </p>
          </div>
          
          <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded text-center">
            <p className="text-[11pt] text-orange-400 font-medium">Seeking technical co-founders & advisors</p>
            <p className="text-[9pt] text-gray-400 mt-1">Next.js, Solana, Frontend Development</p>
          </div>
        </div>
      </section>

      {/* SLIDE 10: The Ask */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center overflow-hidden">
        <img
          src="/eyes-training.jpg"
          alt="AgroV1n3 Training"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50"></div>
        
        <div className="relative z-10 w-[100mm] ml-[12mm]">
          <div className="text-[10pt] text-gray-500 mb-4">10</div>
          <h2 className="text-[36pt] font-bold mb-6 leading-tight">
            The <span className="text-green-400">Ask</span>
          </h2>
          <div className="w-24 h-1 bg-green-500 mb-8"></div>
          
          <div className="bg-black/70 p-6 rounded mb-6">
            <p className="text-[28pt] font-bold text-green-400 mb-2">$300 – $700</p>
            <p className="text-[12pt] text-gray-300">Micro-grants & track bounties</p>
          </div>
          
          <div className="space-y-3 text-[11pt] text-gray-300 mb-8">
            <p>• Complete blockchain/wallet integration</p>
            <p>• Launch full platform in Plateau State</p>
            <p>• Scale to 10,000 youth participants</p>
            <p>• Expand to other Nigerian states</p>
          </div>
          
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded">
            <p className="text-[10pt] text-green-400">Also seeking: Development partnerships, technical mentorship, and ecosystem support</p>
          </div>
        </div>
      </section>

      {/* SLIDE 11: Vision & Impact */}
      <section className="magazine-page w-[210mm] h-[297mm] mx-auto bg-black px-[15mm] py-[20mm] flex flex-col overflow-hidden">
        <div className="text-[10pt] text-gray-500 mb-4">11</div>
        <h2 className="text-[32pt] font-bold mb-2 leading-tight">
          Impact & <span className="text-green-400">Vision</span>
        </h2>
        <div className="w-20 h-1 bg-green-500 mb-8"></div>
        
        <div className="grid grid-cols-2 gap-8 mb-10">
          <div className="text-center border border-gray-800 p-6 rounded">
            <div className="text-[42pt] font-bold text-green-400 mb-2">10,000+</div>
            <p className="text-[11pt] text-gray-200">Nigerian youths economically empowered</p>
          </div>
          <div className="text-center border border-gray-800 p-6 rounded">
            <div className="text-[42pt] font-bold text-orange-500 mb-2">1,000+</div>
            <p className="text-[11pt] text-gray-200">New agro millionaires per LGA (goal)</p>
          </div>
        </div>
        
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-[12pt] text-gray-300">Revive youth interest in agriculture</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-[12pt] text-gray-300">Reduce youth unemployment in Plateau State and beyond</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-[12pt] text-gray-300">Create sustainable agricultural businesses</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-[12pt] text-gray-300">Build Nigeria&apos;s leading youth ag-tech platform</p>
          </div>
        </div>
        
        <div className="mt-auto p-6 bg-green-500/10 border border-green-500/30 rounded text-center">
          <p className="text-[14pt] text-white font-medium">&quot;We&apos;re not just building an app — we&apos;re farming the future of Nigeria.&quot;</p>
          <p className="text-[10pt] text-gray-400 mt-2">— Mantim Danzaki</p>
        </div>
      </section>

      {/* SLIDE 12: Contact / Close */}
      <section className="magazine-page relative w-[210mm] h-[297mm] mx-auto flex items-center justify-center overflow-hidden">
        <img
          src="/eyes-investment.jpg"
          alt="AgroV1n3 Future"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/80"></div>
        
        <div className="relative z-10 text-center px-[20mm]">
          <h2 className="text-[42pt] font-bold mb-6 leading-tight">
            Let&apos;s Farm the <span className="text-green-400">Future</span> Together
          </h2>
          
          <div className="w-24 h-1 bg-green-500 mx-auto mb-10"></div>
          
          <div className="space-y-4 mb-12">
            <p className="text-[14pt] text-gray-300">WhatsApp: <span className="text-white font-medium">09061130264</span></p>
            <p className="text-[14pt] text-gray-300">Platform: <span className="text-green-400 font-medium">agrov1n3.vercel.app</span></p>
            <p className="text-[14pt] text-gray-300">Location: <span className="text-white font-medium">Jos / Abuja, Nigeria</span></p>
          </div>
          
          <div className="p-6 bg-black/60 border border-gray-700 rounded inline-block">
            <p className="text-[12pt] text-gray-400 mb-2">Questions? Ready to partner?</p>
            <p className="text-[14pt] text-white font-medium">Let&apos;s talk!</p>
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-[10pt] text-gray-500">© 2026 AgroV1n3 Initiative | Green V1n3 Nigeria | V1n3Tech</p>
          </div>
        </div>
      </section>
    </main>
  )
}
