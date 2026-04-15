import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgroV1n3 Magazine',
  description: 'The AgroV1n3 initiative - transforming Nigeria\'s agricultural future through youth participation',
}

export default function EyesMagazine() {
  return (
    <div className="w-full bg-background text-foreground overflow-hidden">
      {/* Magazine Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-6xl mx-auto px-12 py-32 text-center">
          <div className="mb-8 inline-block px-6 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Initiative by Mantim Danzaki</span>
          </div>
          <h1 className="text-7xl md:text-8xl font-bold leading-tight mb-8 text-balance">
            AgroV1n3
          </h1>
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 font-light">
            Translating our collective dream of a better Nigeria through massive youth participation in the agriculture value chain
          </p>
          <div className="flex items-center justify-center gap-12">
            <div className="text-left">
              <div className="text-5xl font-bold text-primary mb-2">10,000+</div>
              <p className="text-muted-foreground">Youth in Phase 1</p>
            </div>
            <div className="w-px h-16 bg-border"></div>
            <div className="text-left">
              <div className="text-5xl font-bold text-primary mb-2">14</div>
              <p className="text-muted-foreground">Agriculture Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 px-12 bg-card/30 border-t border-b border-border">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-bold mb-12 leading-tight">
            A Vision for <span className="text-primary">Economic Transformation</span>
          </h2>
          <div className="space-y-8">
            <p className="text-xl leading-relaxed text-foreground/90">
              AgroV1n3 serves as the common denominator program on which several projects will run. It is driven by a vision to translate our collective dream of a better Nigeria through massive youth participation in the agriculture value chain in Nigeria.
            </p>
            <p className="text-xl leading-relaxed text-foreground/90">
              With an estimated average of 10 thousand youths in Plateau State participating and benefiting from agriculture within the first phase of the program, this initiative represents a paradigm shift in how we approach agricultural development and youth empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Introduction */}
      <section className="py-32 px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Green V1n3 Nigeria
              </h3>
              <p className="text-xl text-foreground/80 mb-8 leading-relaxed">
                A unique and multifunctional application that will integrate and coordinate millions of participants (Agro Executives) registered on the AgroV1n3 program.
              </p>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-2xl text-primary font-bold">●</span>
                  <span className="text-lg">Personal interactive page with word, photo, music and video capabilities</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary font-bold">●</span>
                  <span className="text-lg">Agro-online shop with integrated marketplace</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary font-bold">●</span>
                  <span className="text-lg">Investors and investment platform</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary font-bold">●</span>
                  <span className="text-lg">Personal Wallet with V1n3 token integration</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-2xl text-primary font-bold">●</span>
                  <span className="text-lg">Information and advertising capabilities</span>
                </li>
              </ul>
            </div>
            <div className="relative h-96 lg:h-full min-h-96 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-7xl mb-4">🌱</div>
                <p className="text-lg text-muted-foreground">Green V1n3 Platform</p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20">
            <h4 className="text-4xl font-bold mb-12">Key Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Evaluation & Monitoring',
                  description: 'Real-time evaluation and monitoring capability for all participants and activities',
                },
                {
                  title: 'Financial Ratings',
                  description: 'Weekly personal financial and operational ratings for transparency',
                },
                {
                  title: 'News & Updates',
                  description: 'Agriculture and economic news and updates delivered to your dashboard',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-card border border-border rounded-lg hover:border-primary/40 transition-colors"
                >
                  <h5 className="text-2xl font-bold mb-4">{feature.title}</h5>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 14 Communities Section */}
      <section className="py-32 px-12 bg-card/50 border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-4 text-center">
            14 Agriculture Communities
          </h3>
          <p className="text-xl text-center text-foreground/70 mb-16 max-w-2xl mx-auto">
            Each Agro Executive chooses their community and contributes their unique skills and expertise
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Crop Farming',
              'Animal Farming',
              'Agro Marketing',
              'Agro Processing',
              'Agro Management & Legislation',
              'Agro Tourism',
              'Agro Technology',
              'Agro Health Care',
              'Agro Media & Branding',
              'Agro Security',
              'Agro Literature',
              'Agro Motivation & Training',
              'Agro Real Estate',
              'Agro Logistics',
            ].map((community, idx) => (
              <div
                key={idx}
                className="p-6 bg-background border border-border rounded-lg hover:border-primary/60 hover:bg-primary/5 transition-all group cursor-pointer"
              >
                <div className="inline-block px-3 py-1 bg-primary/10 rounded mb-4">
                  <span className="text-sm font-medium text-primary">Community {idx + 1}</span>
                </div>
                <h4 className="text-lg font-bold group-hover:text-primary transition-colors">{community}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Year Vision */}
      <section className="py-32 px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-16 text-center">
            Expected Outcomes <span className="text-primary">in 3 Years</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                stat: '60%',
                label: 'Patronage of Local Agro Products',
                description: 'Increased consumption and trust in Nigerian agricultural goods',
              },
              {
                stat: '1,000',
                label: 'Agro Millionaires Per LGA',
                description: 'Economic empowerment across all local governments',
              },
              {
                stat: '30%',
                label: 'Nigerians out of Poverty',
                description: 'Significant reduction in poverty through agricultural participation',
              },
              {
                stat: 'New',
                label: 'Agricultural Markets Across Africa',
                description: 'Continental expansion of Nigerian agricultural influence',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg text-center"
              >
                <div className="text-5xl md:text-6xl font-bold text-primary mb-4">{item.stat}</div>
                <h4 className="text-xl font-bold mb-3">{item.label}</h4>
                <p className="text-foreground/70 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Structure */}
      <section className="py-32 px-12 bg-card/30 border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-16 text-center">
            Operational Structure
          </h3>

          <div className="space-y-8">
            {[
              {
                title: 'Agro Executives',
                subtitle: 'The thousands of young people',
                description:
                  'Participating youth will register, participate and benefit from the AgroV1n3 program. They will be trained to participate in any of the agriculture value chain on the Green V1n3 platform.',
              },
              {
                title: 'Green V1n3 Community Managers (GCM)',
                subtitle: 'Local community leaders',
                description:
                  'Selected by the LGPAs to manage all participants (agro-executives) at the grouping level. Every community will have a GCM for each of the 14 communities with participants registered under them.',
              },
              {
                title: 'Local Government Program Administrators (LGPA)',
                subtitle: 'Delegates from each LGA',
                description:
                  'Selected youth from each local government in Plateau State. Responsible for mobilizing and managing participants in their local governments. They also serve as Local Government Admins for the 14 Green V1n3 communities.',
              },
              {
                title: 'State Coordinating Council (SCC)',
                subtitle: 'Central oversight body',
                description:
                  'The central body that oversees all the activities across the state and beyond. Provides strategic direction and coordination.',
              },
            ].map((role, idx) => (
              <div key={idx} className="p-8 border border-border rounded-lg hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-2xl font-bold mb-1">{role.title}</h4>
                    <p className="text-primary font-medium mb-3">{role.subtitle}</p>
                    <p className="text-foreground/80 leading-relaxed">{role.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Strategies */}
      <section className="py-32 px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-16 text-center">
            Operational <span className="text-primary">Strategies</span>
          </h3>

          <p className="text-xl text-foreground/80 text-center mb-20 max-w-3xl mx-auto leading-relaxed">
            A relatively success-driven module designed to help achieve a minimum 65% success in the first 3 years
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                letter: 'A',
                title: 'Ownership and Benefits',
                points: [
                  'Nigerian Youth given portion of program shares',
                  'Own profits and royalties in every practical way',
                  'Right to translate effort to profit',
                ],
              },
              {
                letter: 'B',
                title: 'Non-Political, Religious, Ethnic Influence',
                points: [
                  'No activities motivated by external pressures',
                  'Program inclined to core vision only',
                  'Merit-based participation and advancement',
                ],
              },
              {
                letter: 'C',
                title: 'Clarity of Vision',
                points: [
                  'Weekly reminder activities on platform',
                  'All stakeholders run with common excitement',
                  'Consistent communication of expectations',
                ],
              },
              {
                letter: 'D',
                title: 'Communication Strategy',
                points: [
                  'Civil, simple, clear and consistent approach',
                  'Hostile words strictly prohibited',
                  'Proper intent communication',
                ],
              },
              {
                letter: 'E',
                title: 'Mobilisation',
                points: [
                  'Identify-Isolate-Inform-Invite Protocol',
                  'Initiate-Involve-Introduce Framework',
                  'Large youth involvement critical to success',
                ],
              },
            ].map((strategy, idx) => (
              <div key={idx} className="p-8 bg-gradient-to-br from-background to-primary/5 border border-border rounded-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl flex-shrink-0">
                    {strategy.letter}
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold">{strategy.title}</h4>
                  </div>
                </div>
                <ul className="space-y-3">
                  {strategy.points.map((point, pidx) => (
                    <li key={pidx} className="flex gap-3 text-foreground/80">
                      <span className="text-primary font-bold">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agro Executive Journey */}
      <section className="py-32 px-12 bg-card/50 border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-16 text-center">
            The Agro Executive <span className="text-primary">Journey</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-3xl font-bold mb-8 text-primary">Expectations</h4>
              <ul className="space-y-6">
                {[
                  'Fill the AgroV1n3 registration card',
                  'Choose and register in an agriculture community',
                  'Attend the introductory training',
                  'Create a Solana wallet for V1n3 tokens',
                  'Advertise one new agro product monthly',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-2xl text-primary font-bold mt-1">✓</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-3xl font-bold mb-8 text-primary">Benefits</h4>
              <ul className="space-y-6">
                {[
                  'Part of a new economy growth in Nigeria',
                  'Develop and showcase personal talents and skills',
                  'Access to multiple investors',
                  'Access to new markets and customers',
                  'Make predictable profits',
                  'Increase in financial income',
                  'Access to trainings on new ideas',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-2xl text-primary font-bold mt-1">★</span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Government Nucleus */}
      <section className="py-32 px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-8 text-center">
            Local Government <span className="text-primary">Agriculture Company</span>
          </h3>

          <div className="mt-16 p-12 bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-lg">
            <div className="max-w-3xl mx-auto">
              <p className="text-xl leading-relaxed mb-8 text-foreground/90">
                The program is designed to create and register an agriculture and processing company in each participating Local Government Area. This company will serve as the operational nucleus for all agro executives in that LGA.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-3">Ownership</div>
                  <p className="text-foreground/70">Owned by the Program and co-owned by agro executives and investors</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-3">Activities</div>
                  <p className="text-foreground/70">Production, processing, and logistics for agricultural goods</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-3">Scope</div>
                  <p className="text-foreground/70">Both animal and farm produce operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Areas */}
      <section className="py-32 px-12 bg-card/30 border-t border-b border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-16 text-center">
            Areas of Investment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Production', 'Processing', 'Research & Development', 'Training', 'Marketing & Publicity', 'Facilities', 'Policy', 'V1n3 Token Payments'].map((area, idx) => (
              <div key={idx} className="p-8 bg-background border border-border rounded-lg hover:border-primary/40 transition-colors text-center">
                <div className="text-5xl font-bold text-primary mb-4">{String(idx + 1).padStart(2, '0')}</div>
                <h4 className="text-xl font-bold">{area}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LGPA Expectations */}
      <section className="py-32 px-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-6xl md:text-7xl font-bold mb-16 text-center">
            Expectations from LGPAs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Memorandum of Understanding',
                description: 'Sign an MOU with the State Coordinating Council to formalize commitment',
              },
              {
                title: 'Mobilization',
                description: 'Mobilize agro executives from your Local Government Area',
              },
              {
                title: 'Community Management',
                description: 'Manage all 14 agriculture communities under your LGA',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg">
                <h4 className="text-2xl font-bold mb-4 text-primary">{item.title}</h4>
                <p className="text-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Vision */}
      <section className="py-32 px-12 bg-gradient-to-br from-primary/10 via-background to-background border-t border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
            Building <span className="text-primary">Nigeria's Agricultural Future</span>
          </h3>
          <p className="text-2xl text-foreground/80 leading-relaxed mb-12">
            AgroV1n3 represents more than just an agricultural initiative. It&apos;s a movement toward economic empowerment, youth engagement, and sustainable development across Nigeria.
          </p>
          <p className="text-xl text-foreground/70 mb-8">
            Through the Green V1n3 platform, we unite thousands of young farmers, entrepreneurs, and innovators in a shared vision of transforming Nigeria&apos;s agricultural landscape.
          </p>
          <div className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg">
            Initiative by Mantim Danzaki
          </div>
        </div>
      </section>

      {/* Footer info */}
      <section className="py-16 px-12 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-foreground/60 text-sm">
            © 2026 AgroV1n3 Initiative. All rights reserved. A vision for sustainable agricultural development in Nigeria.
          </p>
        </div>
      </section>
    </div>
  )
}
