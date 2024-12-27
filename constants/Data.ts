export const transactionsItems = {
    'GBP': [
        { date: "9 September 2024", description: "Sainsbury's", amount: "£5.00" },
        { date: "8 September 2024", description: "Lloyd's Bank", amount: "+ £5.00" },
        { date: "7 September 2024", description: "Tesco", amount: "£20.00" },
        { date: "6 September 2024", description: "Starbucks", amount: "£4.50" },
        { date: "5 September 2024", description: "Amazon Purchase", amount: "£12.99" },
        { date: "4 September 2024", description: "Train Ticket", amount: "£15.00" },
        { date: "3 September 2024", description: "John Lewis", amount: "£50.00" },
        { date: "2 September 2024", description: "Uber Eats", amount: "£25.00" },
        { date: "1 September 2024", description: "Gym Membership", amount: "£35.00" },
        { date: "31 August 2024", description: "Waitrose", amount: "£60.00" },
        { date: "30 August 2024", description: "Amazon Prime", amount: "£7.99" },
        { date: "29 August 2024", description: "Spotify Subscription", amount: "£9.99" },
        { date: "28 August 2024", description: "Netflix", amount: "£10.99" },
        { date: "27 August 2024", description: "BT Broadband", amount: "£30.00" },
        { date: "26 August 2024", description: "ASDA", amount: "£20.50" },
    ],
    'EUR': [
        { date: "9 September 2024", description: "Lidl", amount: "€15.00" },
        { date: "8 September 2024", description: "Rewe", amount: "+ €20.00" },
        { date: "7 September 2024", description: "Aldi", amount: "€8.00" },
        { date: "6 September 2024", description: "Edeka", amount: "€12.50" },
        { date: "5 September 2024", description: "IKEA", amount: "€60.00" },
        { date: "4 September 2024", description: "Gas Station", amount: "€45.00" },
        { date: "3 September 2024", description: "MediaMarkt", amount: "€110.00" },
        { date: "2 September 2024", description: "DM Drogerie", amount: "€20.00" },
        { date: "1 September 2024", description: "Burger King", amount: "€15.50" },
        { date: "31 August 2024", description: "Deutsche Bahn", amount: "€25.00" },
        { date: "30 August 2024", description: "Zalando", amount: "€80.00" },
        { date: "29 August 2024", description: "Amazon DE", amount: "€35.99" },
        { date: "28 August 2024", description: "McFit Gym", amount: "€20.00" },
        { date: "27 August 2024", description: "Telekom", amount: "€40.00" },
        { date: "26 August 2024", description: "Euronics", amount: "€95.00" },
    ],
    'USD': [
        { date: "9 September 2024", description: "Walmart", amount: "$10.00" },
        { date: "8 September 2024", description: "Bank of America", amount: "+ $50.00" },
        { date: "7 September 2024", description: "Starbucks", amount: "$5.00" },
        { date: "6 September 2024", description: "Amazon Purchase", amount: "$25.00" },
        { date: "5 September 2024", description: "Uber", amount: "$12.00" },
        { date: "4 September 2024", description: "McDonald's", amount: "$8.99" },
        { date: "3 September 2024", description: "Target", amount: "$30.00" },
        { date: "2 September 2024", description: "Whole Foods", amount: "$45.00" },
        { date: "1 September 2024", description: "Netflix", amount: "$13.99" },
        { date: "31 August 2024", description: "Costco", amount: "$75.00" },
        { date: "30 August 2024", description: "Apple Store", amount: "$120.00" },
        { date: "29 August 2024", description: "Hulu", amount: "$11.99" },
        { date: "28 August 2024", description: "Walmart", amount: "$25.00" },
        { date: "27 August 2024", description: "Sprint", amount: "$50.00" },
        { date: "26 August 2024", description: "Best Buy", amount: "$200.00" },
    ],
};

export const currencyItems = [
    { symbol: '£21.22', value: 'GBP' },
    { symbol: '€30.46', value: 'EUR' },
    { symbol: '$40.12', value: 'USD' },
];

export const currencyFullNames = {
    'GBP': 'Great British Pounds',
    'EUR': 'Euros',
    'USD': 'US Dollars',
};

export const statementsData = [
    // USD Statements
    { id: '1', date: '2024-11-01', description: 'Statement for November 2024', clicked: false, currency: 'USD' },
    { id: '2', date: '2024-10-01', description: 'Statement for October 2024', clicked: false, currency: 'USD' },
    { id: '3', date: '2024-09-01', description: 'Statement for September 2024', clicked: false, currency: 'USD' },
    { id: '4', date: '2024-08-01', description: 'Statement for August 2024', clicked: false, currency: 'USD' },
    { id: '5', date: '2024-07-01', description: 'Statement for July 2024', clicked: false, currency: 'USD' },
    { id: '6', date: '2024-06-01', description: 'Statement for June 2024', clicked: false, currency: 'USD' },

    // EUR Statements
    { id: '7', date: '2024-11-01', description: 'Statement for November 2024', clicked: false, currency: 'EUR' },
    { id: '8', date: '2024-10-01', description: 'Statement for October 2024', clicked: false, currency: 'EUR' },
    { id: '9', date: '2024-09-01', description: 'Statement for September 2024', clicked: false, currency: 'EUR' },
    { id: '10', date: '2024-08-01', description: 'Statement for August 2024', clicked: false, currency: 'EUR' },
    { id: '11', date: '2024-07-01', description: 'Statement for July 2024', clicked: false, currency: 'EUR' },
    { id: '12', date: '2024-06-01', description: 'Statement for June 2024', clicked: false, currency: 'EUR' },

    // GBP Statements
    { id: '13', date: '2024-11-01', description: 'Statement for November 2024', clicked: false, currency: 'GBP' },
    { id: '14', date: '2024-10-01', description: 'Statement for October 2024', clicked: false, currency: 'GBP' },
    { id: '15', date: '2024-09-01', description: 'Statement for September 2024', clicked: false, currency: 'GBP' },
    { id: '16', date: '2024-08-01', description: 'Statement for August 2024', clicked: false, currency: 'GBP' },
    { id: '17', date: '2024-07-01', description: 'Statement for July 2024', clicked: false, currency: 'GBP' },
    { id: '18', date: '2024-06-01', description: 'Statement for June 2024', clicked: false, currency: 'GBP' },

    // Additional USD, EUR, and GBP statements for previous years
    { id: '19', date: '2023-12-01', description: 'Statement for December 2023', clicked: false, currency: 'USD' },
    { id: '20', date: '2023-11-01', description: 'Statement for November 2023', clicked: false, currency: 'EUR' },
    { id: '21', date: '2023-10-01', description: 'Statement for October 2023', clicked: false, currency: 'GBP' },
    { id: '22', date: '2023-09-01', description: 'Statement for September 2023', clicked: false, currency: 'USD' },
    { id: '23', date: '2023-08-01', description: 'Statement for August 2023', clicked: false, currency: 'EUR' },
    { id: '24', date: '2023-07-01', description: 'Statement for July 2023', clicked: false, currency: 'GBP' },
    { id: '25', date: '2023-06-01', description: 'Statement for June 2023', clicked: false, currency: 'USD' },
    { id: '26', date: '2023-05-01', description: 'Statement for May 2023', clicked: false, currency: 'EUR' },
    { id: '27', date: '2023-04-01', description: 'Statement for April 2023', clicked: false, currency: 'GBP' },
];

export const messagesData = [
    {
        id: '1',
        date: '2024-11-01',
        sender: 'Alice Johnson',
        content: 'Hey, are we still on for the meeting tomorrow?',
        clicked: false
    },
    {
        id: '2',
        date: '2024-10-29',
        sender: 'Bob Smith',
        content: 'Just sent over the latest report. Let me know if you need anything else.',
        clicked: false
    },
    {
        id: '3',
        date: '2024-10-20',
        sender: 'Charlie Brown',
        content: 'Can you review the document I shared? It needs some changes.',
        clicked: false
    },
    {
        id: '4',
        date: '2024-10-15',
        sender: 'Diana Prince',
        content: 'Happy Birthday! Hope you have an amazing day!',
        clicked: true
    },
    {
        id: '5',
        date: '2024-10-05',
        sender: 'Evan Green',
        content: 'Reminder: Project deadline is approaching. Let’s make sure everything is ready.',
        clicked: false
    },
    {
        id: '6',
        date: '2024-09-28',
        sender: 'Fiona White',
        content: 'Quick question about the budget proposal you submitted.',
        clicked: true
    },
    {
        id: '7',
        date: '2024-09-10',
        sender: 'George Lee',
        content: 'I’ll be out of office next week. Please reach out to Sarah for any urgent matters.',
        clicked: false
    },
    {
        id: '8',
        date: '2024-08-25',
        sender: 'Hannah Brown',
        content: 'Congratulations on the promotion!',
        clicked: true
    },
    {
        id: '9',
        date: '2024-08-12',
        sender: 'Ivy Chen',
        content: 'Can we reschedule our meeting to next Thursday?',
        clicked: false
    },
    {
        id: '10',
        date: '2024-07-30',
        sender: 'Jack Wilson',
        content: 'Thanks for your help with the project. Great work!',
        clicked: true
    },
];

export const spendingDataIncome = [
    { name: 'Category A', population: 40, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Category B', population: 30, color: '#0F0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Category C', population: 20, color: '#00F', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Category D', population: 10, color: '#FF0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
];

export const spendingDataOutgoing = [
    { name: 'Category A', population: 50, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Category B', population: 30, color: '#0F0', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    { name: 'Category C', population: 20, color: '#00F', legendFontColor: '#7F7F7F', legendFontSize: 15 },
];

export const vendorData = {
    all: {
        labels: ["Amazon", "Walmart", "Starbucks", "Apple", "Costco", "Netflix", "Uber", "McDonald's", "Target", "Disney+"],
        values: [150, 120, 90, 200, 100, 50, 80, 70, 130, 60],
    },
    food: {
        labels: ["Starbucks", "Costa"],
        values: [90, 70],
    },
    shopping: {
        labels: ["Amazon", "Walmart", "Target"],
        values: [150, 120, 130],
    },
    entertainment: {
        labels: ["Netflix", "Disney+", "Apple"],
        values: [50, 60, 200],
    },
    transportation: {
        labels: ["Uber", "Ride"],
        values: [80, 100],
    },
};

export const timeSeriesDataDaily = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            data: [50, 75, 100, 80, 90, 60, 120],
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            strokeWidth: 2,
        },
    ],
};

export const timeSeriesDataWeekly = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
        {
            data: [450, 500, 550, 600],
            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
            strokeWidth: 2,
        },
    ],
};

export const timeSeriesDataMonthly = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
        {
            data: [450, 500, 600, 650, 700, 750, 720, 680, 700, 750, 800, 850],
            color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
            strokeWidth: 2,
        },
    ],
};

export const timeSeriesDataAnnually = {
    labels: ["2019", "2020", "2021", "2022", "2023"],
    datasets: [
        {
            data: [4500, 5200, 6000, 5800, 6300],
            color: (opacity = 1) => `rgba(153, 102, 255, ${opacity})`,
            strokeWidth: 2,
        },
    ],
};
