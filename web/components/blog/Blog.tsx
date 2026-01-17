import Link from "next/link"
export default function Blog() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <div className="absolute inset-0 -z-10">
        {/* Blue glow  like gradient at back*/}
        <div className="absolute top-[-120px] left-[12%] h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[140px]" />

        {/* Red glow like gradient  */}
        <div className="absolute top-[-80px] right-[14%] h-[380px] w-[380px] rounded-full bg-red-500/25 blur-[140px]" />

        {/* Soft noremal glow  of gradient */}
        <div className="absolute top-[240px] left-[42%] h-[300px] w-[300px] rounded-full bg-white/5 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32">
        <div className="md:w-[1152px] mx-auto px-6 py-20 font-mono">

          {/* Meta */}
          <div className="flex justify-center items-center gap-2 text-xs font-sans font-thin tracking-wide opacity-80 mb-6">
            <Link href="/"><span className="uppercase cursor-pointer hover:underline">home page again</span></Link>
            <span className="opacity-40">/</span>
            <span>Engineering</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-semibold max-w-[760px] mx-auto text-center leading-tight">
            Behind the scenes of Zellr’s architecture
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base font-thin text-center max-w-[700px] mx-auto opacity-80">
            What it takes to build a Vercel-like static deployment platform from scratch —
            from GitHub repositories to globally served subdomains.
          </p>

          {/* Divider */}
          <div className="mt-16 mb-12 h-px w-full bg-white/10" />

          {/* Blog Content */}
          <div className="space-y-10 text-lg font-thin font-sans max-w-[900px] mx-auto">

            <section>
              <h2 className="text-xl font-normal mb-3">Overview</h2>
              <p>
                Zellr is a static web deployment platform that automatically builds and
                hosts GitHub repositories with custom subdomain routing. Inspired by how
                platforms like Vercel operate internally, Zellr is designed around
                isolation, scalability, and simplicity.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Platform Architecture</h2>
              <p>
                The system follows a microservices-oriented architecture. Each service
                owns a single responsibility and communicates through shared
                infrastructure like Redis and object storage.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Phase 1: Upload Service</h2>
              <p>
                The upload service acts as the entry point. It clones the repository,
                filters unnecessary files, uploads source code to object storage, and
                queues a build job in Redis for asynchronous processing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Phase 2: Deploy Service</h2>
              <p>
                The deploy service consumes build jobs from Redis. It installs
                dependencies, executes the build in isolation, and uploads the final
                assets back to storage for serving.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Phase 3: Request Handler</h2>
              <p>
                The request handler maps incoming subdomains to deployments and serves
                static assets directly from storage, ensuring correct content types and
                fast response times.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Phase 4: Frontend</h2>
              <p>
                The frontend provides the user-facing interface for submitting
                repositories, tracking deployment progress, and accessing live
                applications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Shared Infrastructure</h2>
              <p>
                Redis handles job queues and deployment state, while object storage keeps
                the platform stateless and resilient. This design enables horizontal
                scaling without tight coupling between services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-normal mb-3">Deployment Flow</h2>
              <p>
                A deployment starts with a repository submission, moves through upload,
                build, and serve phases, and ends with a globally accessible subdomain —
                following a predictable and scalable pipeline.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
