const db=require('./connection');
const {User, Record, Genre} = require('../models');

db.once('open', async()=>{
    await Genre.deleteMany();

    const genres = await Genre.insertMany([
        { name: 'Blues' },
        { name: 'Classical' },
        { name: 'Pop' },
        { name: 'Rock' },
        { name: 'Jazz' }
    ]);

    console.log('genres seeded');

    await Record.deleteMany();

    const records = await Record.insertMany([
        {
            title:'Teaser',
            year:1975,
            condition:'Good',
            description:'Vintage Tommy Bolin Teaser LP 1975',
            price:12.75,
            image: 'teaser.jpg',
            genre: genres[3]._id,
            quantity:10
        },
        {
            title:'Weird Scenes Inside the Gold Mine',
            year:1972,
            condition:'Sealed',
            description:'Vintage The Doors Weird Scenes Inside The Gold Mine 2LP',
            price:25.00,
            image: 'the-doors.jpg',
            genre: genres[3]._id,
            quantity:5
        },
        {
            title:'My Way',
            year:1970,
            condition:'Acceptable',
            description:'Vintage Frank Sinatra "My Way" Vinyl Record LP Album 12',
            price:35.00,
            image: 'my-way.jpg',
            genre: genres[2]._id,
            quantity:6
        },
        {
            title:'Bruce Springsteen and the E Street Band Live 1975-85',
            year:1986,
            condition:'Used',
            description:'vintage classic rock vinyl records 5 Record Set',
            price:75.00,
            image: 'bruce-springsteen.jpg',
            genre: genres[3]._id,
            quanity:7
        },
        {
            title:'Nobody Else But Me',
            year:1955,
            condition:'Used',
            description:'JAZZ Betty Bennett Atlantic 1226 Record Vintage Vinyl Album LP',
            price:60.00,
            image: 'jazz.jpg',
            genre: genres[4]._id,
            quantity:3
        },
        {
            title:'Penguin',
            year:1973,
            condition:'Used',
            description:'Fleetwood Mac - Penguin Vintage Vinyl LP Original Press Gatefold Record',
            price:47.00,
            image: 'fleetwood-mac.jpeg',
            genre: genres[3]._id,
            quantity:5
        },
        {
            title:'The Four Seasons',
            year:2015,
            condition:'Sealed',
            description:'Vivaldi: Four Seasons (180G) (Vinyl)',
            price:47.00,
            image: 'the-four-seasons.jpg',
            genre: genres[1]._id,
            quantity:20
        },
        {
            title:'Where Did You Sleep Last Night',
            year:1976,
            condition:'Used',
            description:'Where Did You Sleep Last Night: Lead Belly Legacy, Vol. 1 Limited Edition LP',
            price:29.98,
            image: 'blues.jpg',
            genre: genres[0]._id,
            quantity:8
        }
    ]);
    console.log('records seeded');

    process.exit();
});