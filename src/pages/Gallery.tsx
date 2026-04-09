import { motion } from 'motion/react';
import { Image as ImageIcon, Utensils, Music, Coffee } from 'lucide-react';

const Gallery = () => {
  const categories = [
    {
      id: 'plates',
      title: 'The Plates',
      description: 'High-quality close-ups of our signature Sizzling Sisig and Wings.',
      icon: <Utensils size={24} />,
      images: [
        { url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=800', alt: 'Sizzling Sisig' },
        { url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&q=80&w=800', alt: 'Crispy Wings' },
        { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800', alt: 'Grilled Platter' },
        { url: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=800', alt: 'Fresh Salad' },
      ]
    },
    {
      id: 'vibe',
      title: 'The Vibe',
      description: 'Our outdoor seating, videoke setup, and the night-time chill.',
      icon: <Music size={24} />,
      images: [
        { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800', alt: 'Outdoor Seating' },
        { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', alt: 'Videoke Night' },
        { url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=800', alt: 'Night Atmosphere' },
        { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', alt: 'Customer Joy' },
      ]
    },
    {
      id: 'pour',
      title: 'The Pour',
      description: 'Colorful frappes, bucket deals, and refreshing drinks.',
      icon: <Coffee size={24} />,
      images: [
        { url: 'https://images.unsplash.com/photo-1544145945-f904253d0c7e?auto=format&fit=crop&q=80&w=800', alt: 'Colorful Frappe' },
        { url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800', alt: 'Bucket Deal' },
        { url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&q=80&w=800', alt: 'Iced Coffee' },
        { url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800', alt: 'Cocktail Night' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4"
          >
            <ImageIcon size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">Gallery</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 tracking-tight">Eat, Drink, Enjoy</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Explore the flavors, the atmosphere, and the refreshing moments at Gip's Kitchen.</p>
        </div>

        <div className="space-y-24">
          {categories.map((category, catIdx) => (
            <section key={category.id}>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-dark text-white p-3 rounded-2xl">
                  {category.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-dark">{category.title}</h2>
                  <p className="text-gray-500 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.images.map((image, imgIdx) => (
                  <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: imgIdx * 0.1 }}
                    className="group relative aspect-square overflow-hidden rounded-3xl bg-gray-100 shadow-sm hover:shadow-xl transition-all"
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <p className="text-white font-bold">{image.alt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
