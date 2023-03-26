const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');
const eventsRoutes = require('./events');
const smartRoutes = require('./segment');
const blogRoutes = require('./blog');
const profileRoutes = require('./profile');
const skillsRoutes = require('./skills');
const industriesRoutes = require('./industries');
const technologiesRoutes = require('./technologies');
const saleTemp =require('./saleTemp')

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);


// sale temp
router.use('/saleTemp',saleTemp)

// category routes
router.use('/category', categoryRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

// Event routes
router.use('/events/', eventsRoutes);

//Segment Category
router.use('/segment/', smartRoutes);

// Blog Routes
router.use('/blogs/', blogRoutes);

// Profile Routes
router.use('/profile/', profileRoutes);

// Skills Routes
router.use('/skills/', skillsRoutes);

// Industries Routes
router.use('/industries/', industriesRoutes);

// Technologies Routes
router.use('/technologies/', technologiesRoutes);
module.exports = router;
