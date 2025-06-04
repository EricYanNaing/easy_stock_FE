import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";

type categoryType = "main-dish" | "starter" | "dessert" | "drink";

interface MenuItem {
    id: number;
    taste?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    popular?: boolean;
}

interface MenuType {
    id: number;
    category: categoryType;
    menu: MenuItem[];
}

export const menuList: MenuType[] = [
    {
        id: 1,
        category: "main-dish",
        menu: [
            {
                id: 1,
                taste: "spicy",
                name: "Chicken Curry",
                description: "A spicy and flavorful chicken curry made with a blend of spices and coconut milk.",
                price: 12.99,
                image: img1,
                popular: true,
            },
            {
                id: 15,
                name: "Beef Stroganoff",
                description: "Tender strips of beef in a creamy mushroom sauce served over noodles.",
                price: 13.99,
                image: img5,
                taste: "savory",
            },
            {
                id: 16,
                name: "Grilled Salmon",
                description: "Salmon fillet grilled to perfection with herbs and lemon butter.",
                price: 15.49,
                image: img5,
                taste: "light",
                popular: true,
            },
            {
                id: 17,
                name: "Vegetable Stir Fry",
                description: "A medley of seasonal vegetables stir-fried in a tangy soy garlic sauce.",
                price: 10.99,
                image: img5,
            },
            {
                id: 18,
                name: "Spaghetti Bolognese",
                description: "Classic Italian pasta with a rich and hearty meat sauce.",
                price: 11.75,
                image: img5,
                taste: "rich",
            },
        ],
    },
    {
      id: 2,
      category: "starter",
      menu: [
        {
          id: 2,
          name: "Spring Rolls",
          description: "Crispy vegetable spring rolls served with sweet chili sauce.",
          price: 5.99,
          image: img2,
          taste: "savory",
          popular: true,
        },
        {
          id: 3,
          name: "Garlic Bread",
          description: "Toasted bread slices topped with garlic butter and herbs.",
          price: 4.5,
          image: img2,
        },
        {
          id: 4,
          name: "Stuffed Mushrooms",
          description: "Mushroom caps filled with cheese and herbs.",
          price: 6.25,
          image: img2,
        },
        {
          id: 5,
          name: "Mini Quiches",
          description: "Savory pastries filled with egg, cheese, and spinach.",
          price: 5.75,
          image: img2,
        },
      ],
    },
    {
      id: 3,
      category: "dessert",
      menu: [
        {
          id: 6,
          name: "Chocolate Lava Cake",
          description: "Rich chocolate cake with a gooey molten center.",
          price: 6.99,
          image: img3,
          taste: "sweet",
          popular: true,
        },
        {
          id: 7,
          name: "Cheesecake",
          description: "Classic New York style cheesecake with a graham cracker crust.",
          price: 7.5,
          image: img3,
        },
        {
          id: 8,
          name: "Fruit Tart",
          description: "Crisp pastry crust filled with custard and topped with fresh fruits.",
          price: 6.5,
          image: img3,
        },
        {
          id: 9,
          name: "Ice Cream Sundae",
          description: "Vanilla ice cream topped with chocolate sauce, nuts, and a cherry.",
          price: 5.25,
          image: img3,
        },
      ],
    },
    {
      id: 4,
      category: "drink",
      menu: [
        {
          id: 10,
          name: "Iced Tea",
          description: "Refreshing black iced tea with a hint of lemon.",
          price: 3.0,
          image: img4,
          taste: "cool",
        },
        {
          id: 11,
          name: "Lemonade",
          description: "Chilled lemonade made with fresh lemons and sugar.",
          price: 3.5,
          image: img4,
        },
        {
          id: 12,
          name: "Mango Smoothie",
          description: "Creamy smoothie blended with ripe mangoes and yogurt.",
          price: 4.75,
          image: img4,
          popular: true,
        },
        {
          id: 13,
          name: "Espresso",
          description: "Strong and rich single-shot espresso.",
          price: 2.5,
          image: img4,
        },
        {
          id: 14,
          name: "Hot Chocolate",
          description: "Steamy cocoa drink topped with whipped cream.",
          price: 3.75,
          image: img4,
        },
      ],
    }
];