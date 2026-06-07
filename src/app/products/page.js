"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../../components/Cards/productCard";
import {
  IoArrowForward,
  IoBuildOutline,
  IoCodeSlashOutline,
  IoEyeOutline,
  IoFlaskOutline,
  IoGitBranchOutline,
  IoGitNetworkOutline,
  IoHardwareChipOutline,
  IoRocketOutline,
} from "react-icons/io5";
import apiClient from "./../../api/client";

// Fixed product categories (tabs)
const productCategories = [
  {
    id: "robotics",
    title: "Robots",
    icon: <IoGitNetworkOutline size={24} />,
  },
  {
    id: "embedded",
    title: "Controllers",
    icon: <IoHardwareChipOutline size={24} />,
  },
  {
    id: "industrial",
    title: "Equipment",
    icon: <IoBuildOutline size={24} />,
  },
  {
    id: "software",
    title: "Software",
    icon: <IoCodeSlashOutline size={24} />,
  },
];

// Helper function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

// Map category id to matching keywords for filtering
const getCategoryKeywords = (categoryId) => {
  switch (categoryId) {
    case "robotics":
      return ["robot", "quadruped", "amr", "mobile robot", "inspection"];
    case "embedded":
      return [
        "controller",
        "power distribution",
        "jetson",
        "interface",
        "embedded",
        "board",
      ];
    case "industrial":
      return [
        "conveyor",
        "sorting",
        "picking",
        "vision inspection",
        "industrial",
        "equipment",
      ];
    case "software":
      return [
        "software",
        "platform",
        "middleware",
        "intelligence",
        "dashboard",
        "factory",
      ];
    default:
      return [];
  }
};

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("robotics");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sectionRefs = {
    hero: useRef(null),
    products: useRef(null),
  };

  const isInView = {
    hero: useInView(sectionRefs.hero, { once: true, amount: 0.1 }),
    products: useInView(sectionRefs.products, { once: true, amount: 0.1 }),
  };

  // Map category string from backend to category id
  const mapCategoryToId = (category) => {
    const categoryMap = {
      Robots: "robotics",
      Controllers: "embedded",
      Equipment: "industrial",
      Software: "software",
    };
    return categoryMap[category] || "robotics";
  };

  const getAllProducts = async () => {
    try {
      const response = await apiClient.get("/robot/get");

      if (response.ok && response.data?.success) {
        const robotsData = response.data.robots || [];

        // Transform products to match ProductCard format
        const transformedProducts = robotsData.map((robot) => ({
          _id: robot._id,
          title: stripHtml(robot.name),
          slug: robot.slug,
          image: robot.images?.[0]?.url || "/images/placeholder-robot.jpg",
          description: stripHtml(
            robot.description ||
              "Advanced robotics platform under development.",
          ),
          category: robot.category || "",
          // Map category string to category id for filtering
          categoryId: mapCategoryToId(robot.category),
          keyPoints: robot.keyPoints || [],
          searchText:
            `${stripHtml(robot.name)} ${robot.category || ""} ${stripHtml(robot.description || "")}`.toLowerCase(),
        }));

        setAllProducts(transformedProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Filter products based on active category
  // const getFilteredProducts = () => {
  //   const keywords = getCategoryKeywords(activeCategory);

  //   return allProducts.filter((product) => {
  //     const searchText = product.searchText;
  //     // Check if product matches any keyword for this category
  //     return keywords.some((keyword) => searchText.includes(keyword));
  //   });
  // };

  const getFilteredProducts = () => {
    return allProducts.filter((product) => {
      return product.categoryId === activeCategory;
    });
  };

  const filteredProducts = getFilteredProducts();
  const selectedCategory = productCategories.find(
    (cat) => cat.id === activeCategory,
  );
  const hasNoProducts = filteredProducts.length === 0;

  const roboticsHighlights = [
    {
      icon: <IoEyeOutline size={24} />,
      title: "Robotics Vision",
      description: "Advanced perception systems for autonomous navigation",
    },
    {
      icon: <IoGitBranchOutline size={24} />,
      title: "AI & Locomotion",
      description: "Reinforcement learning for dynamic movement",
    },
    {
      icon: <IoFlaskOutline size={24} />,
      title: "Research & Innovation",
      description: "Pushing boundaries in robotics technology",
    },
    {
      icon: <IoRocketOutline size={24} />,
      title: "Robot Demonstrations",
      description: "Showcasing real-world capabilities",
    },
  ];

  return (
    <main className="bg-[var(--color-dark-100)]">
      {/* ========== HERO SECTION ========== */}
      <section
        ref={sectionRefs.hero}
        className="relative min-h-[60vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-20"
      >
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
        `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Centered Blue Gradient */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-2xl h-[40vh] max-h-[400px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(0,136,219,0.3) 0%, rgba(0,109,177,0.15) 50%, transparent 100%)",
          }}
        />

        <div className="relative z-20 max-w-7xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.hero ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="h-[2px] w-12 bg-[var(--color-secondary-400)]" />
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-[var(--color-secondary-400)]">
                Our Portfolio
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-tight text-white mb-5">
              Our Products
            </h1>

            <p className="font-mono text-base md:text-lg text-[var(--color-text-secondary)] max-w-2xl">
              Explore our comprehensive range of robotics, embedded systems,
              industrial automation, and software solutions.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                Discuss Your Requirements →
              </Link>
              <Link href="/robotics" className="btn-secondary">
                Explore Solutions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== PRODUCTS ========== */}
      <section
        ref={sectionRefs.products}
        className="relative py-20 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mb-8">
              Products
            </h2>

            {/* Category Tabs - Fixed categories */}
            <div className="flex flex-wrap gap-8 mb-12 border-b border-white/10">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`
                    relative
                    pb-5
                    text-lg
                    font-medium
                    transition-all
                    duration-300
                    ${
                      activeCategory === category.id
                        ? "text-white"
                        : "text-gray-400 hover:text-white cursor-pointer font-mono"
                    }
                  `}
                >
                  {category.title}

                  {activeCategory === category.id && (
                    <span className="absolute left-0 bottom-0 h-[3px] w-full bg-blue-400" />
                  )}
                </button>
              ))}
            </div>

            {/* Category Icon & Title */}
            {selectedCategory && (
              <div className="flex items-center gap-4 mb-10">
                <div className="text-[#0088db]">{selectedCategory.icon}</div>
                <h3 className="text-2xl font-semibold text-white">
                  {selectedCategory.title}
                </h3>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {hasNoProducts ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
                <IoBuildOutline
                  size={40}
                  className="text-[var(--color-text-muted)]"
                />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-2">
                No Products in {selectedCategory?.title}
              </h3>
              <p className="font-mono text-[var(--color-text-secondary)] max-w-md mx-auto">
                We're currently adding products to this category. Please check
                back soon for our latest robotics and automation solutions.
              </p>
              <Link href="/contact" className="btn-primary inline-flex mt-8">
                Contact for Inquiries
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          )}

          {/* Robotics Highlights Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.products ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-secondary-400)]/20 bg-[var(--color-secondary-400)]/5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-secondary-400)]" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--color-secondary-400)]">
                  Innovation Focus
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
                Robotics &{" "}
                <span className="text-[var(--color-secondary-400)]">
                  Research
                </span>
              </h2>
              <p className="font-mono text-sm text-[var(--color-text-secondary)] mt-3 max-w-2xl mx-auto">
                Pushing the boundaries of what's possible in robotics technology
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {roboticsHighlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView.products ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-center p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[var(--color-primary-500)]/30 transition-all duration-300 group"
                >
                  <div className="text-[var(--color-secondary-400)] mb-3 flex justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-[var(--color-text-muted)]">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Custom Solution CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView.products ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true, amount: 0.1 }}
            className="mt-20 text-center"
          >
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[var(--color-primary-500)]/10 to-[var(--color-secondary-400)]/10 p-8">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-white mb-3">
                Need a Custom Solution?
              </h3>
              <p className="font-body text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
                We develop tailored robotics and automation products for
                specific industrial requirements.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                Contact Us <IoArrowForward size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
