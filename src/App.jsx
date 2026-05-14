import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, ArrowRight, ArrowLeft } from 'lucide-react';
import heroImg from './assets/hero.png';
const dummyProducts = [
  {
    id: 1,
    name: 'OVO Graphic T-Shirt',
    price: '$20',
    image: '/tshirts/white (1).jpeg',
    images: [
      '/tshirts/white (1).jpeg',
      '/tshirts/white (2).jpeg',
      '/tshirts/white (3).jpeg',
    ],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Red', hex: '#ff0000' },
      { name: 'Gray', hex: '#808080' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Premium quality graphic t-shirt featuring the iconic owl logo. Crafted from soft cotton for a perfect drape and exceptional durability.'
  },
  {
    id: 2,
    name: 'Black Skin Jacket',
    price: '$45',
    image: '/female courts/WhatsApp Image 2026-05-14 at 06.18.31.jpeg',
    images: [
      '/female courts/WhatsApp Image 2026-05-14 at 06.18.31.jpeg'
    ],
    colors: [
      { name: 'Camel', hex: 'black' },
    ],
    sizes: ['LG', 'XL'],
    description: 'A modern take on the classic trench. Features clean lines, hidden closures, and water-resistant technical fabric.'
  },
  {
    id: 3,
    name: 'White Skin Jacket',
    price: '$50',
    image: '/male courts/WhatsApp Image 2026-05-14 at 06.18.31.jpeg',
    images: [
      '/male courts/WhatsApp Image 2026-05-14 at 06.18.31.jpeg'
    ],
    colors: [
      { name: 'Tan', hex: 'white' },
    ],
    sizes: ['One Size'],
    description: 'Handcrafted from full-grain Italian leather. Spacious enough for daily essentials while maintaining a sleek silhouette.'
  }
];

const Navbar = ({ activeSection, onNavigate, searchQuery, setSearchQuery }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-brand-light/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <Menu className="w-5 h-5 cursor-pointer lg:hidden" />
            <div className="hidden lg:flex space-x-8 text-sm tracking-widest uppercase">
              <button 
                onClick={() => onNavigate('home')}
                className={`transition-colors cursor-pointer pb-1 ${activeSection === 'home' ? 'text-black font-bold border-b border-black' : 'text-gray-500 hover:text-black'}`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('shop')}
                className={`transition-colors cursor-pointer pb-1 ${activeSection === 'shop' || activeSection === 'product' ? 'text-black font-bold border-b border-black' : 'text-gray-500 hover:text-black'}`}
              >
                Shop
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className={`transition-colors cursor-pointer pb-1 ${activeSection === 'about' ? 'text-black font-bold border-b border-black' : 'text-gray-500 hover:text-black'}`}
              >
                About
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="font-serif text-2xl tracking-[0.2em] font-bold">Kesha Collections</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value && activeSection !== 'shop') {
                    onNavigate('shop');
                  }
                }}
                placeholder="Search..."
                className={`absolute right-8 transition-all duration-300 ease-in-out border-b border-black bg-transparent outline-none text-sm placeholder-gray-400 ${isSearchOpen ? 'w-40 md:w-48 opacity-100 px-2 py-1' : 'w-0 opacity-0 px-0 py-0 border-transparent'}`}
              />
              <Search 
                className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery('');
                }}
              />
            </div>
            <ShoppingBag className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ onExplore }) => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
    <div className="absolute inset-0 w-full h-full">
      <img
        src={heroImg}
        alt="Fashion Model in Coat"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>

    <div className="relative z-10 text-center text-white px-4">
      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-none">
        Autumn<br />Elegance
      </h1>
      <p className="font-sans text-lg md:text-xl tracking-widest uppercase mb-10 max-w-2xl mx-auto font-light">
        Discover the new standard of minimalist luxury
      </p>
      <button
        onClick={onExplore}
        className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
      >
        <span>Explore Collection</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  </section>
);

const FeaturedProducts = ({ onProductSelect, searchQuery, onClearSearch }) => {
  const [showAll, setShowAll] = useState(false);
  
  const filteredProducts = dummyProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedProducts = (showAll || searchQuery) ? filteredProducts : filteredProducts.slice(0, 3);

  return (
    <section id="shop" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-16">
        <div>
          <h2 className="font-serif text-4xl mb-4">{searchQuery ? 'Search Results' : 'Curated Selection'}</h2>
          <p className="text-gray-500 tracking-wide">
            {searchQuery 
              ? `Showing results for "${searchQuery}"` 
              : 'Timeless pieces for the modern wardrobe.'}
          </p>
        </div>
        {!searchQuery && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="hidden md:flex items-center space-x-2 text-sm tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer"
          >
            <span>{showAll ? 'View Less' : 'View All'}</span>
            <ArrowRight className={`w-4 h-4 transform transition-transform duration-300 ${showAll ? '-rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4 text-lg">No products found matching your search.</p>
          <button 
            onClick={onClearSearch}
            className="text-black border-b border-black pb-1 text-sm tracking-widest uppercase hover:text-gray-500 transition-colors cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {displayedProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => onProductSelect(product)}>
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onProductSelect(product); }}
                    className="bg-white text-black px-6 py-3 text-sm tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                  >
                    Quick View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <div 
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
                <span className="font-sans text-sm tracking-wide">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!searchQuery && (
        <div className="md:hidden mt-12 flex justify-center">
          <button 
            onClick={() => setShowAll(!showAll)}
            className="flex items-center space-x-2 text-sm tracking-widest uppercase border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer"
          >
            <span>{showAll ? 'View Less' : 'View All'}</span>
          </button>
        </div>
      )}
    </section>
  );
};

const SingleProductView = ({ product, onBack }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images || [product.image];

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-brand-light">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm tracking-widest uppercase mb-12 hover:text-gray-500 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop</span>
      </button>

      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        <div className="md:w-1/2 bg-gray-100 shadow-sm relative group overflow-hidden">
          <img 
            src={images[currentImageIndex]} 
            alt={`${product.name} - View ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover object-center aspect-[3/4] md:aspect-auto"
          />
          {images.length > 1 && (
            <>
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer shadow-sm"
              >
                <ArrowLeft className="w-5 h-5 text-black" />
              </button>
              <button 
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white cursor-pointer shadow-sm"
              >
                <ArrowRight className="w-5 h-5 text-black" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                 {images.map((_, idx) => (
                   <button 
                     key={idx} 
                     onClick={() => setCurrentImageIndex(idx)}
                     className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${idx === currentImageIndex ? 'bg-black' : 'bg-gray-400'}`} 
                   />
                 ))}
              </div>
            </>
          )}
        </div>
        
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="font-serif text-4xl lg:text-5xl mb-4">{product.name}</h1>
          <p className="text-2xl mb-8 font-light">{product.price}</p>
          
          <div className="w-12 h-px bg-black mb-8"></div>
          
          <p className="text-gray-600 mb-10 leading-relaxed text-lg">
            {product.description}
          </p>
          
          <div className="mb-10">
            <span className="text-sm tracking-widest uppercase mb-4 block">
              Color: <span className="font-bold">{selectedColor?.name}</span>
            </span>
            <div className="flex space-x-4">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer ${
                    selectedColor?.name === color.name 
                      ? 'border-black scale-110' 
                      : 'border-transparent hover:scale-105 hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="w-full h-full rounded-full border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <span className="text-sm tracking-widest uppercase mb-4 block">
              Size: <span className="font-bold">{selectedSize}</span>
            </span>
            <div className="flex flex-wrap gap-4">
              {product.sizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-12 px-4 border flex items-center justify-center transition-colors cursor-pointer ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          <a 
            href={`https://wa.me/250780805598?text=Hi, I am interested in the ${product.name} (Color: ${selectedColor?.name}, Size: ${selectedSize})`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-black text-white py-5 tracking-widest uppercase text-sm hover:bg-gray-800 transition-colors flex justify-center items-center space-x-3 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <span>Contact me on 0780805598</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const BrandStory = () => (
  <section id="about" className="py-24 bg-brand-dark text-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="font-serif text-3xl md:text-5xl mb-10 leading-tight">
        "We believe in the power of simplicity. Every garment is a testament to uncompromised quality and timeless design."
      </h2>
      <p className="text-gray-400 tracking-widest uppercase text-sm mb-12">
        Our Philosophy
      </p>
      <div className="w-px h-24 bg-white/20 mx-auto"></div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-brand-light py-16 px-4 border-t border-gray-200">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-2">
        <h3 className="font-serif text-2xl tracking-[0.2em] font-bold mb-6">Kesha Collections</h3>
        <p className="text-gray-500 max-w-sm mb-8">
          Redefining modern luxury through minimalist design and sustainable practices.
        </p>
        <div className="flex space-x-4">
          <a href="https://www.instagram.com/kesha.collection_/?hl=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://wa.me/250780805598" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-gray-300 flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
          </a>
        </div>
      </div>

      <div>
        <h4 className="font-sans text-sm tracking-widest uppercase mb-6 font-bold">Shop</h4>
        <ul className="space-y-4 text-gray-500">
          <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
          <li><a href="#" className="hover:text-black transition-colors">Coats & Jackets</a></li>
          <li><a href="#" className="hover:text-black transition-colors">T-Shirts</a></li>
          <li><a href="#" className="hover:text-black transition-colors">Accessories</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-sans text-sm tracking-widest uppercase mb-6 font-bold">Newsletter</h4>
        <p className="text-gray-500 mb-4 text-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
        <form className="flex border-b border-black pb-2">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
          />
          <button type="submit" className="text-sm tracking-widest uppercase hover:text-gray-500 transition-colors cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-200 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
      <p>&copy; 2026 Kesha Collections. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (section) => {
    setActiveSection(section);
    if (section !== 'product') {
      setSelectedProduct(null);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setActiveSection('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToShop = () => {
    setSelectedProduct(null);
    setActiveSection('shop');
    setTimeout(() => {
      const element = document.getElementById('shop');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        activeSection={activeSection} 
        onNavigate={handleNavigate} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {activeSection === 'product' && selectedProduct ? (
        <SingleProductView product={selectedProduct} onBack={handleBackToShop} />
      ) : (
        <>
          <Hero onExplore={() => handleNavigate('shop')} />
          <FeaturedProducts 
            onProductSelect={handleProductSelect} 
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery('')}
          />
          <BrandStory />
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
