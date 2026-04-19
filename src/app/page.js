export default function Home() {
  return (
    <main className="">
      <section className="bg-secondary-400 py-28 px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[#9E5413] mb-6">
          Building the Future with Robotics
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-[#9E5413]/80 mb-8">
          VNX Robotics delivers cutting-edge automation, AI-powered systems, and
          advanced robotics solutions to transform industries and accelerate
          innovation.
        </p>
        <button className="px-6 py-3 bg-primary-400 text-white rounded-full font-medium hover:bg-[#9E5413] transition">
          Explore Solutions
        </button>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#9E5413] mb-6">
          About VNX Robotics
        </h2>
        <p className="text-[#9E5413]/80 leading-relaxed">
          VNX Robotics is focused on delivering intelligent automation systems,
          combining robotics, artificial intelligence, and modern engineering to
          solve real-world industrial challenges. Our expertise spans across
          robotics design, embedded systems, and scalable automation solutions
          tailored for businesses of all sizes.
        </p>
      </section>

      <section className="bg-secondary-400 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#9E5413] mb-10 text-center">
            Our Services
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Robotics Development",
                desc: "Custom robotics solutions designed for automation and efficiency.",
              },
              {
                title: "Industrial Automation",
                desc: "Smart systems to streamline operations and reduce manual work.",
              },
              {
                title: "AI Integration",
                desc: "Enhancing systems with AI for smarter decision making.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-[#9E5413] mb-3">
                  {item.title}
                </h3>
                <p className="text-[#9E5413]/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-[#9E5413] mb-10 text-center">
          Technologies We Use
        </h2>

        <div className="grid md:grid-cols-4 gap-6 text-center">
          {["AI & ML", "IoT Systems", "Embedded Systems", "3D Prototyping"].map(
            (tech, i) => (
              <div
                key={i}
                className="border border-secondary-400 rounded-lg py-6 hover:bg-secondary-400/40 transition"
              >
                <p className="text-[#9E5413] font-medium">{tech}</p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="bg-[#9E5413] py-16 text-center text-white px-4">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Ready to Build the Future?
        </h2>
        <p className="mb-6 text-white/80">
          Let’s collaborate to create innovative robotics and automation
          solutions.
        </p>
        <button className="px-6 py-3 bg-primary-400 rounded-full font-medium hover:opacity-90 transition">
          Contact Us
        </button>
      </section>
    </main>
  );
}
