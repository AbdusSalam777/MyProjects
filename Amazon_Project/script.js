 const products=[
{
    name:'Black and Gray Athletic Cotton Socks - 6 Pairs',
    price:1090,
    image:'/images/socks.jpg',
    },

{
        name:'Intermediate Size Basketball for children',
        price:2090,
        image:'/images/basketball.jpg',
    },

{
        name:'Adults Plain Cotton T-Shirt -Blue colour - 2 Pack',
        price:1090,
        image:'/images/t-shirt.jpg',
    },

{
        name:'2 Slot Bread Electric Toaster - Black colour',
        price:2067,
        image:'/images/toaster.jpg',
    },
    
 {
        name:'6 Piece White Dinner Plate Set on Sale',
        price:3499,
        image:'/images/plates.jpg',
    },

 {
        name:'6-Piece Nonstick, Carbon Steel Oven Bakeware Baking ',
        price:2400,
        image:'/images/molds.webp',
    },
  
 {
        name:'Plain Hooded Fleece Sweatshirt for Boys and Men',
        price:3500,
        image:'/images/hoodie.jpg',
    },

{
        name:'Luxury Towel Set - Graphite Gray and Black',
        price:2899,
        image:'/images/towl.jpg',
    },

{
        name:'Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz',
        price:3390,
        image:'/images/detergent.jpg',
    },

{
        name:'Waterproof Knit Athletic Sneakers - Gray',
        price:2070,
        image:'/images/shoes.jpg',
    },

{
        name:'Womens Chiffon Beachwear Cover Up - Black',
        price:1560,
        image:'/images/skirt.jpg',
    },

 {
        name:'Womens Two Strap Buckle Sandals - Tan',
        price:2499,
        image:'/images/sandles.jpg',
    },

{
        name:'Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter',
        price:3074,
        image:'/images/kettle.webp',
    },

{
        name:'Ultra Soft Tissue 2-Ply - 18 Box -Best Quality',
        price:1095,
        image:'/images/tissue.jpg',
    },

{
        name:'Straw Lifeguard Sun Hat for women and girls',
        price:1179,
        image:'/images/hat.webp',
    },

{
        name:'Mens Regular-Fit Quick-Dry Golf Polo Shirt',
        price:1399,
        image:'/images/collar-shirt.jpg',
    },

{
        name:'Trash Can with Foot Pedal - Brushed Stainless Steel',
        price:1460,
        image:'/images/bin.jpg',
    },

    
 {
        name:'Womens Knit Ballet Flat shoes on sale',
        price:2799,
        image:'/images/womwn-shoes.jpg',
    },

    
{
        name:'Round Sunglasses for Men and Women',
        price:799,
        image:'/images/glasses.jpg',
    },

{
        name:'Womens Chunky Cable Beanie - Gray',
        price:950,
        image:'/images/hot-hat.webp',
    },

{
        name:'Vanity Mirror with Heavy Base - Chrome',
        price:1299,
        image:'/images/mirror.jpg',
    },

{
        name:'Round Airtight Food Storage Containers - 5 Piece',
        price:1355,
        image:'/images/food-containers.jpg',
    },

    
 {
        name:'Countertop Blender - 64oz, 1400 Watts ',
        price:1095,
        image:'/images/blender.jpg',
    },

 {
        name:'Mens Full-Zip Hooded Fleece Sweatshirt',
        price:1365,
        image:'/images/hood.jpg',
    },

    {
        name:'2-Ply Kitchen Paper Towels - 30 Pack',
        price:799,
        image:'/images/towel-roll.jpg',
    },

    {
        name:'10-Piece Mixing Bowl Set with Lids - Floral',
        price:499,
        image:'/images/bowls.jpg',
    },

    {
        name:'Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels',
        price:1999,
        image:'/images/curtains.jpg',
    },

    {
        name:'Duvet Cover Set with Zipper Closure Best Quality',
        price:1799,
        image:'/images/bed-sheet.jpg',
    },

    {
        name:'Bathroom Bath Rug Mat 20 x 31 Inch - Grey',
        price:1865,
        image:'/images/rug.jpg',
    },

    {
        name:'Non-Stick Cookware Set, Pots, Pans and Utensils - 15',
        price:1190,
        image:'/images/pots.webp',
    },


      ]

    let productsHTML='';

    products.forEach((product)=>{

       
        productsHTML+=`
         <div class="container">
        <div  class="image-div">

            <img class="image" src="${product.image}">
    
            <div class="title">
                <p class="text">${product.name}</p>
            </div>
            <div class="ratings">
                <img  class="stars"src="/images/ratings.png">
            </div>
            <div class="price">
                <p class="price-text"><strong>$${product.price/100}</strong></p>
            </div>
            <div class="select">
                <select class="select-menu">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
    
            </div>

            <div class="add-button">
                <button class="Add-button-div js-button">Add to Cart</button>
            </div>
    
          </div>
     </div>`
    
    });


 document.querySelector('.js-products-grid').
 innerHTML=productsHTML;

 //code for button starts here


 buttonselector=document.querySelectorAll('.js-button');

 buttonselector.forEach((button)=>{

    button.addEventListener('click',()=>{

        console.log('hello');
  });

  });
