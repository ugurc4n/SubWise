import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const categories = [
    {
      name: 'Eğlence',
      slug: 'eglence',
      icon: '🎬',
      color: '#ef4444',
    },
    {
      name: 'Müzik',
      slug: 'muzik',
      icon: '🎵',
      color: '#8b5cf6',
    },
    {
      name: 'Bulut Depolama',
      slug: 'bulut-depolama',
      icon: '☁️',
      color: '#3b82f6',
    },
    {
      name: 'Yazılım',
      slug: 'yazilim',
      icon: '💻',
      color: '#10b981',
    },
    {
      name: 'Tasarım',
      slug: 'tasarim',
      icon: '🎨',
      color: '#f59e0b',
    },
    {
      name: 'Eğitim',
      slug: 'egitim',
      icon: '📚',
      color: '#06b6d4',
    },
    {
      name: 'Haberleşme',
      slug: 'haberlesme',
      icon: '💬',
      color: '#ec4899',
    },
    {
      name: 'Üretkenlik',
      slug: 'uretkenlik',
      icon: '⚡',
      color: '#f97316',
    },
    {
      name: 'Güvenlik',
      slug: 'guvenlik',
      icon: '🔒',
      color: '#6366f1',
    },
    {
      name: 'Oyun',
      slug: 'oyun',
      icon: '🎮',
      color: '#14b8a6',
    },
    {
      name: 'Sağlık & Fitness',
      slug: 'saglik-fitness',
      icon: '💪',
      color: '#84cc16',
    },
    {
      name: 'Haber & Dergi',
      slug: 'haber-dergi',
      icon: '📰',
      color: '#64748b',
    },
    {
      name: 'Finans',
      slug: 'finans',
      icon: '💰',
      color: '#eab308',
    },
    {
      name: 'Diğer',
      slug: 'diger',
      icon: '📦',
      color: '#71717a',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`Created ${categories.length} categories`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
