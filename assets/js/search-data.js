// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "ABOUT",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "PROJECTS",
          description: "A growing collection of my passion projects!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "dropdown-publications",
              title: "publications",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/publications/";
              },
            },{id: "dropdown-bookshelf",
              title: "bookshelf",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/books/";
              },
            },{id: "dropdown-blog",
              title: "blog",
              description: "",
              section: "Dropdown",
              handler: () => {
                window.location.href = "/blog/";
              },
            },{id: "post-the-role-of-carbon-markets-in-achieving-net-zero-emissions",
        
          title: "The Role of Carbon Markets in Achieving Net-Zero Emissions",
        
        description: "As the world races toward net-zero, carbon markets are key—but are AI-driven solutions the fix or just a temporary Band-Aid for deeper systemic issues?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/math/";
          
        },
      },{id: "post-google-gemini-updates-flash-1-5-gemma-2-and-project-astra",
        
          title: 'Google Gemini updates: Flash 1.5, Gemma 2 and Project Astra <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "We’re sharing updates across our Gemini family of models and a glimpse of Project Astra, our vision for the future of AI assistants.",
        section: "Posts",
        handler: () => {
          
            window.open("https://blog.google/technology/ai/google-gemini-update-flash-ai-assistant-io-2024/", "_blank");
          
        },
      },{id: "post-displaying-external-posts-on-your-al-folio-blog",
        
          title: 'Displaying External Posts on Your al-folio Blog <svg width="1.2rem" height="1.2rem" top=".5rem" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M17 13.5v6H5v-12h6m3-3h6v6m0-6-9 9" class="icon_svg-stroke" stroke="#999" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.open("https://medium.com/@al-folio/displaying-external-posts-on-your-al-folio-blog-b60a1d241a0a?source=rss-17feae71c3c4------2", "_blank");
          
        },
      },{id: "books-one-hundred-years-of-solitude",
          title: 'One Hundred Years of Solitude',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/one_hundred_years_of_solitude/";
            },},{id: "books-any-human-heart",
          title: 'Any Human Heart',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/any_human_heart/";
            },},{id: "books-pattern-recognition-and-machine-learning",
          title: 'Pattern Recognition and Machine Learning',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/prml_bishop/";
            },},{id: "books-how-to-avoid-a-climate-disaster",
          title: 'How to Avoid a Climate Disaster',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/how_to_avoid_a_climate_disaster/";
            },},{id: "books-energy-and-civilization-a-history",
          title: 'Energy and Civilization — A History',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/energy_and_civilization/";
            },},{id: "books-how-the-world-really-works",
          title: 'How the World Really Works',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/how_the_world_really_works/";
            },},{id: "books-deep-learning",
          title: 'Deep Learning',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/deep_learning_goodfellow/";
            },},{id: "books-probabilistic-machine-learning-an-introduction",
          title: 'Probabilistic Machine Learning — An Introduction',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/pml_murphy_intro/";
            },},{id: "books-bayesian-data-analysis-3rd-ed",
          title: 'Bayesian Data Analysis (3rd ed.)',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/bayesian_data_analysis/";
            },},{id: "books-",
          title: '',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/renewable_energy_finance_raikar_adamson/";
            },},{id: "books-sustainable-energy-without-the-hot-air",
          title: 'Sustainable Energy – Without the Hot Air',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/sustainable_energy_without_the_hot_air/";
            },},{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-commerical-cooling-emissions-model",
          title: 'Commerical Cooling Emissions Model',
          description: "Forecasting cooling energy + refrigerant emissions and building abatement cost curves.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-snow-leopard-individual-identification",
          title: 'Snow Leopard Individual Identification',
          description: "Embedding-based image retrieval to support human-in-the-loop snow leopard re-identification from camera-trap images.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-slack-clone-react-flask",
          title: 'Slack Clone (React + Flask)',
          description: "Real-time chat app with auth, channels, DMs, and message history.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-in-suspension-graphic-design-project",
          title: 'In suspension - graphic design project',
          description: "",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-rooted-photo-essay",
          title: 'Rooted — Photo Essay',
          description: "Small moments of contact with living structures older than us.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hugging_trees/";
            },},{id: "projects-ml-methods-for-medical-ai",
          title: 'ML Methods for Medical AI',
          description: "Applying machine learning to methylation data in a medical context. Details coming soon.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/methylation/";
            },},{id: "projects-renewable-generation-forecasting",
          title: 'Renewable Generation Forecasting',
          description: "Point and probabilistic forecasts for Germany’s hourly electricity load with optional renewables and weather predictors.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/renewable_generation_forecasting/";
            },},{id: "projects-tender-ruins-photo-essay",
          title: 'Tender Ruins — Photo Essay',
          description: "A quiet archive of what we throw away.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/trash_museum/";
            },},{id: "projects-whole-foods-cdr-portfolio-amp-memo",
          title: 'Whole Foods CDR Portfolio &amp;amp; Memo',
          description: "Carbon removals portfolio recommendation and executive memo for Whole Foods Market.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/wholefoods_cdr_portfolio/";
            },},{id: "projects-wind-farm-project-finance",
          title: 'Wind Farm Project Finance',
          description: "A case study in renewable energy project financing — modeling capital structure, risk, and returns for wind infrastructure. Details coming soon.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/wind_farm_finance/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72%75%69%79%61%6E.%68%75%61%6E%67@%6F%75%74%6C%6F%6F%6B.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/RuiyanH", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/ruiy_augen", "_blank");
        },
      },{
        id: 'social-unsplash',
        title: 'Unsplash',
        section: 'Socials',
        handler: () => {
          window.open("https://unsplash.com/@riah215", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
