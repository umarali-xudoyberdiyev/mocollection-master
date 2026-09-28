const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.Davlatlar.deleteMany();
  await prisma.Davlatlar.createMany({
    data: [
      {
        title: "Yaponiya",
        location: "Sharqiy Osiyo",
        size: 377975,
        flag: "🇯🇵",
        userId,
      },
      {
        title: "Rossiya",
        location: "Yevroosiyo",
        size: 17098246,
        flag: "🇷🇺",
        userId,
      },
      {
        title: "O'zbekiston",
        location: "Markaziy Osiyo",
        size: 448978,
        flag: "🇺🇿",
        userId,
      },
      {
        title: "Fransiya",
        location: "G'arbiy Yevropa",
        size: 551695,
        flag: "🇫🇷",
        userId,
      },
      {
        title: "Germaniya",
        location: "Markaziy Yevropa",
        size: 357592,
        flag: "🇩🇪",
        userId,
      },
      {
        title: "Angliya",
        location: "Shimoliy Yevropa",
        size: 243610,
        flag: "🇬🇧",
        userId,
      },
      {
        title: "Italiya",
        location: "Janubiy Yevropa",
        size: 301340,
        flag: "🇮🇹",
        userId,
      },
      {
        title: "Turkiya",
        location: "Yevroosiyo ko'prigi",
        size: 783562,
        flag: "🇹🇷",
        userId,
      },
    ],
  });

  console.log("Seed data muvaffaqiyatli qo'shildi");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
