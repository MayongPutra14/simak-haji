import { useNavigate } from 'react-router';
import {
  IconArrowLeft,
  IconBookOpen2,
  IconLocation,
  IconNav,
  IconChevronNext,
  IconBookHeart,
} from '../../../utils/helpers/decorations';

const categories = [
  {
    id: 'doa-praktis',
    title: 'Kumpulan Doa Praktis',
    description:
      'Kumpulan doa sehari-hari yang praktis untuk berbagai kebutuhan.',
    icon: IconBookOpen2,
  },
  {
    id: 'doa-haji',
    title: 'Doa dan Dzikir Haji / Umroh',
    description:
      'Panduan doa dan dzikir selama menjalankan ibadah haji dan umroh.',
    icon: IconBookHeart,
  },
  {
    id: 'masjidil-haram',
    title: 'Masjidil Haram',
    description: 'Kumpulan doa ketika berada di Masjidil Haram.',
    icon: IconLocation,
  },
  {
    id: 'perjalanan',
    title: 'Perjalanan',
    description: 'Doa dan dzikir yang dibaca selama perjalanan ibadah.',
    icon: IconNav,
  },
];

//  MAIN COMPONENT
export default function HajjDuasPage() {
  const navigate = useNavigate();
  // handle category selection and navigate to category list page
  function handleCategoryClick(categoryId) {
    // navigate to the dynamic list route based on category id
    navigate(`/hajj/categories/${categoryId}`);
  }

  function handleBack() {
    navigate(-1);
  }

  return (
    //  MAIN PAGE CONTAINER
    //  apply subtle diagonal gradient with primary and secondary backgrounds
    <div className="min-h-screen bg-linear-to-br from-emerald-950 via-teal-950 to-emerald-900 p-4 md:p-8 font-sans selection:bg-teal-700">
      {/* CONTENT  limit max width for desktop view and center content */}
      <div className="max-w-4xl mx-auto">
        {/* HEADER SECTION */}
        <header className="flex items-center gap-4 mb-8">
          {/* back button triggering application router back navigation */}
          <button
            onClick={handleBack}
            className="p-2 rounded-full bg-emerald-900/30 hover:bg-emerald-800/50 border border-emerald-400/20 text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            aria-label="Go back to dashboard"
          >
            <IconArrowLeft size={24} />
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-100">
            Doa & Dzikir Haji
          </h1>
        </header>
        {/* INTRODUCTION SECTION */}
        <section className="mb-10">
          <p className="text-emerald-200/70 text-lg max-w-2xl leading-relaxed">
            Temukan berbagai kumpulan doa dan dzikir untuk menemani perjalanan
            ibadah haji dan umroh Anda.
          </p>
        </section>
        {/*  CATEGORY  single column on mobile, dual column on tablet and desktop */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              //  CATEGORY CARD
              //  apply glassmorphism, soft shadows, and hover border effects
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group flex items-start gap-4 p-5 md:p-6 w-full text-left rounded-2xl bg-emerald-950/40 backdrop-blur-md border border-emerald-400/20 hover:bg-emerald-800/50 hover:border-teal-400/50 hover:shadow-lg hover:shadow-teal-900/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 cursor-pointer"
              >
                {/* ICON  invert colors gently on hover state */}
                <div className="shrink-0 p-3 rounded-xl bg-emerald-900/50 text-teal-400 group-hover:bg-teal-400 group-hover:text-emerald-950 transition-colors duration-300">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                {/* TEXT CONTENT */}
                <div className="grow">
                  <h2 className="text-lg font-medium text-slate-100 mb-1">
                    {category.title}
                  </h2>
                  {/* secondary text with reduced opacity */}
                  <p className="text-emerald-200/60 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
                {/* NAVIGATION  subtle indicator that highlights on */}
                <div className="shrink-0 self-center text-emerald-500/40 group-hover:text-teal-400 transition-colors duration-300">
                  <IconChevronNext size={20} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
