// ======================================================
// VIRTUAL ABACUS - SOROBAN STYLE
// ======================================================
// Upper bead = 5
// Lower beads = 1 each
// Maximum rods = 17
// ======================================================


// ======================================================
// SETTINGS
// ======================================================

let columns = 17;

let state = [];

let resetMode = true;


// ======================================================
// COLOR SEQUENCE
// ======================================================

const beadColors = [

    '#F080B8', // 1  Pink
    '#18B866', // 2  Green
    '#FFFFFF', // 3  White
    '#1976D2', // 4  Blue
    '#F5D000', // 5  Yellow
    '#D92B20', // 6  Red
    '#1976D2', // 7  Blue
    '#D92B20', // 8  Red
    '#F5D000', // 9  Yellow
    '#F080B8', // 10 Pink
    '#FFFFFF', // 11 White
    '#18B866', // 12 Green
    '#F080B8', // 13 Pink
    '#18B866', // 14 Green
    '#FFFFFF', // 15 White
    '#F5D000', // 16 Yellow
    '#D92B20'  // 17 Red

];


// ======================================================
// SPECIAL RESET ORDER
// ======================================================
//
// 15 14 10 9 8 4 3 2 1 5 6 7 11 12 13 16 17
//
// ======================================================

const resetRodOrder = [

    15,
    14,
    10,
    9,
    8,

    4,
    3,
    2,
    1,

    5,
    6,
    7,

    11,
    12,
    13,

    16,
    17

];


// ======================================================
// GET ROD ORDER
// ======================================================

function getRodOrder() {

    // --------------------------------------------------
    // RESET MODE
    // --------------------------------------------------

    if (
        columns === 17 &&
        resetMode === true
    ) {

        return [...resetRodOrder];

    }


    // --------------------------------------------------
    // 1 ROD
    // --------------------------------------------------

    if (columns === 1) {

        return [1];

    }


    // --------------------------------------------------
    // 2 - 4
    //
    // Reverse
    //
    // 2 = 2 1
    // 3 = 3 2 1
    // 4 = 4 3 2 1
    // --------------------------------------------------

    if (columns <= 4) {

        const order = [];

        for (
            let i = columns;
            i >= 1;
            i--
        ) {

            order.push(i);

        }

        return order;

    }


    // --------------------------------------------------
    // 5 - 17
    //
    // 4 3 2 1 5 6 7 8...
    // --------------------------------------------------

    const order = [

        4,
        3,
        2,
        1

    ];


    for (
        let i = 5;
        i <= columns;
        i++
    ) {

        order.push(i);

    }


    return order;

}


// ======================================================
// INITIALIZE STATE
// ======================================================

function initState() {

    state = [];


    for (
        let i = 0;
        i < columns;
        i++
    ) {

        state.push({

            upper: 0,

            lower: 0

        });

    }

}


// ======================================================
// BUILD ABACUS
// ======================================================

function buildAbacus() {

    const abacus =
        document.getElementById('abacus');


    if (!abacus) {

        console.error(
            'Abacus element not found'
        );

        return;

    }


    // Clear existing abacus

    abacus.innerHTML = '';


    // Get rod order

    const rodOrder =
        getRodOrder();


    // ==================================================
    // UPPER SECTION
    // ==================================================

    const upperContainer =
        document.createElement('div');


    upperContainer.className =
        'upper-section-container';


    // ==================================================
    // DIVIDER BAR
    // ==================================================

    const dividerBar =
        document.createElement('div');


    dividerBar.className =
        'divider-bar';


    // ==================================================
    // LOWER SECTION
    // ==================================================

    const lowerContainer =
        document.createElement('div');


    lowerContainer.className =
        'lower-section-container';


    // ==================================================
    // CREATE RODS
    // ==================================================

    rodOrder.forEach(
        function (
            rodNumber,
            displayIndex
        ) {

            // ------------------------------------------
            // COLOR
            // ------------------------------------------

            const color =
                beadColors[
                    rodNumber - 1
                ];


            // ------------------------------------------
            // UPPER COLUMN
            // ------------------------------------------

            const upperColumn =
                document.createElement('div');


            upperColumn.className =
                'upper-column';


            upperColumn.dataset.col =
                displayIndex;


            upperColumn.dataset.rod =
                rodNumber;


            // ------------------------------------------
            // UPPER ROD
            // ------------------------------------------

            const upperRod =
                document.createElement('div');


            upperRod.className =
                'rod';


            upperColumn.appendChild(
                upperRod
            );


            // ------------------------------------------
            // UPPER BEAD
            // ------------------------------------------

            const upperBead =
                document.createElement('div');


            upperBead.className =
                'bead';


            upperBead.style.backgroundColor =
                color;


            upperBead.dataset.col =
                displayIndex;


            upperBead.dataset.type =
                'upper';


            upperBead.dataset.rod =
                rodNumber;


            upperBead.addEventListener(
                'click',
                handleBeadClick
            );


            upperColumn.appendChild(
                upperBead
            );


            upperContainer.appendChild(
                upperColumn
            );


            // ------------------------------------------
            // LOWER COLUMN
            // ------------------------------------------

            const lowerColumn =
                document.createElement('div');


            lowerColumn.className =
                'lower-column';


            lowerColumn.dataset.col =
                displayIndex;


            lowerColumn.dataset.rod =
                rodNumber;


            // ------------------------------------------
            // LOWER ROD
            // ------------------------------------------

            const lowerRod =
                document.createElement('div');


            lowerRod.className =
                'rod';


            lowerColumn.appendChild(
                lowerRod
            );


            // ------------------------------------------
            // FOUR LOWER BEADS
            // ------------------------------------------

            for (
                let b = 0;
                b < 4;
                b++
            ) {

                const bead =
                    document.createElement('div');


                bead.className =
                    'bead';


                bead.style.backgroundColor =
                    color;


                bead.dataset.col =
                    displayIndex;


                bead.dataset.type =
                    'lower';


                bead.dataset.index =
                    b;


                bead.dataset.rod =
                    rodNumber;


                bead.addEventListener(
                    'click',
                    handleBeadClick
                );


                lowerColumn.appendChild(
                    bead
                );

            }


            lowerContainer.appendChild(
                lowerColumn
            );


            // ------------------------------------------
            // DIVIDER MARKER
            // ------------------------------------------
            //
            // IMPORTANT:
            // Dot position is based on DISPLAY POSITION.
            // It does NOT use rod number.
            //
            // Every 3 displayed rods:
            //
            // . after 3
            // . after 6
            // . after 9
            // . after 12
            // . after 15
            //
            // ------------------------------------------

            const marker =
                document.createElement('div');


            marker.className =
                'divider-marker';


            const posFromRight =
                rodOrder.length -
                1 -
                displayIndex;


            if (

                posFromRight === 3 ||

                posFromRight === 6 ||

                posFromRight === 9 ||

                posFromRight === 12 ||

                posFromRight === 15

            ) {

                marker.classList.add(
                    'has-dot'
                );

            }


            dividerBar.appendChild(
                marker
            );

        }
    );


    // ==================================================
    // ADD TO ABACUS
    // ==================================================

    abacus.appendChild(
        upperContainer
    );


    abacus.appendChild(
        dividerBar
    );


    abacus.appendChild(
        lowerContainer
    );


    // ==================================================
    // UPDATE
    // ==================================================

    updateBeadPositions();

    updateDisplay();

}


// ======================================================
// BEAD CLICK
// ======================================================

function handleBeadClick(e) {

    const col =
        parseInt(
            e.target.dataset.col
        );


    const type =
        e.target.dataset.type;


    if (
        isNaN(col) ||
        !state[col]
    ) {

        return;

    }


    // ==================================================
    // UPPER BEAD
    // ==================================================

    if (
        type === 'upper'
    ) {

        state[col].upper =
            state[col].upper === 0
                ? 1
                : 0;

    }


    // ==================================================
    // LOWER BEAD
    // ==================================================

    else {

        const index =
            parseInt(
                e.target.dataset.index
            );


        const isActive =
            index <
            state[col].lower;


        if (isActive) {

            state[col].lower =
                index;

        }

        else {

            state[col].lower =
                index + 1;

        }

    }


    // Update beads

    updateBeadPositions();


    // Update number

    updateDisplay();

}


// ======================================================
// UPDATE BEAD POSITIONS
// ======================================================

function updateBeadPositions() {

    // ==================================================
    // UPPER BEADS
    // ==================================================

    const upperColumns =
        document.querySelectorAll(
            '.upper-column'
        );


    upperColumns.forEach(
        function (
            colEl,
            colIndex
        ) {

            if (!state[colIndex]) {

                return;

            }


            const upperBead =
                colEl.querySelector(
                    '.bead'
                );


            if (!upperBead) {

                return;

            }


            if (
                state[colIndex].upper === 1
            ) {

                upperBead.classList.add(
                    'active'
                );

            }

            else {

                upperBead.classList.remove(
                    'active'
                );

            }

        }
    );


    // ==================================================
    // LOWER BEADS
    // ==================================================

    const lowerColumns =
        document.querySelectorAll(
            '.lower-column'
        );


    lowerColumns.forEach(
        function (
            colEl,
            colIndex
        ) {

            if (!state[colIndex]) {

                return;

            }


            const lowerBeads =
                colEl.querySelectorAll(
                    '.bead'
                );


            lowerBeads.forEach(
                function (
                    bead,
                    beadIndex
                ) {

                    if (
                        beadIndex <
                        state[colIndex].lower
                    ) {

                        bead.classList.add(
                            'active'
                        );

                    }

                    else {

                        bead.classList.remove(
                            'active'
                        );

                    }

                }
            );

        }
    );

}


// ======================================================
// UPDATE DISPLAY VALUE
// ======================================================

function updateDisplay() {

    let total = 0;


    for (
        let i = 0;
        i < columns;
        i++
    ) {

        if (!state[i]) {

            continue;

        }


        const placeValue =
            Math.pow(
                10,
                columns - 1 - i
            );


        const columnValue =
            (
                state[i].upper * 5
            )
            +
            state[i].lower;


        total +=
            columnValue *
            placeValue;

    }


    const valueElement =
        document.getElementById(
            'value'
        );


    if (valueElement) {

        valueElement.textContent =
            total.toLocaleString();

    }

}


// ======================================================
// CLEAR RODS
// ======================================================
//
// Clears ONLY beads.
//
// Rod count stays exactly the same.
//
// Example:
//
// Rod count = 1
// Move 2 beads
// Clear Rods
// -> beads return
// -> Rod count remains 1
//
// ======================================================

function clearRodsOnly() {

    // Do NOT change columns

    // Do NOT change rod count

    for (
        let i = 0;
        i < state.length;
        i++
    ) {

        state[i].upper = 0;

        state[i].lower = 0;

    }


    // Update beads

    updateBeadPositions();


    // Update value

    updateDisplay();

}


// ======================================================
// RESET
// ======================================================
//
// Reset always:
//
// 17 rods
//
// Order:
//
// 15 14 10 9 8
// 4 3 2 1
// 5 6 7
// 11 12 13
// 16 17
//
// ======================================================

function clearAbacus() {

    // ----------------------------------------------
    // SET 17 RODS
    // ----------------------------------------------

    columns = 17;


    // ----------------------------------------------
    // ENABLE RESET MODE
    // ----------------------------------------------

    resetMode = true;


    // ----------------------------------------------
    // UPDATE ROD COUNT INPUT
    // ----------------------------------------------

    const rodCount =
        document.getElementById(
            'rodCount'
        );


    if (rodCount) {

        rodCount.value = 17;

    }


    // ----------------------------------------------
    // CLEAR STATE
    // ----------------------------------------------

    initState();


    // ----------------------------------------------
    // REBUILD
    // ----------------------------------------------

    buildAbacus();

}


// ======================================================
// ROD COUNT CHANGE
// ======================================================

function handleRodCountChange() {

    const input =
        document.getElementById(
            'rodCount'
        );


    if (!input) {

        return;

    }


    let newCount =
        parseInt(
            input.value
        );


    // ----------------------------------------------
    // MINIMUM
    // ----------------------------------------------

    if (
        isNaN(newCount) ||
        newCount < 1
    ) {

        newCount = 1;

    }


    // ----------------------------------------------
    // MAXIMUM
    // ----------------------------------------------

    if (
        newCount > 17
    ) {

        newCount = 17;

    }


    // ----------------------------------------------
    // UPDATE INPUT
    // ----------------------------------------------

    input.value =
        newCount;


    // ----------------------------------------------
    // UPDATE COLUMNS
    // ----------------------------------------------

    columns =
        newCount;


    // ----------------------------------------------
    // MANUAL ROD SELECTION
    // ----------------------------------------------

    resetMode = false;


    // ----------------------------------------------
    // RESET BEADS
    // ----------------------------------------------

    initState();


    // ----------------------------------------------
    // REBUILD
    // ----------------------------------------------

    buildAbacus();

}


// ======================================================
// MOBILE SIDEBAR OPEN
// ======================================================

function openMobileSidebar() {

    const sidebar =
        document.getElementById(
            'mobileSidebar'
        );


    const overlay =
        document.getElementById(
            'mobileOverlay'
        );


    if (sidebar) {

        sidebar.classList.add(
            'active'
        );

    }


    if (overlay) {

        overlay.classList.add(
            'active'
        );

    }


    document.body.style.overflow =
        'hidden';

}


// ======================================================
// MOBILE SIDEBAR CLOSE
// ======================================================

function closeMobileSidebar() {

    const sidebar =
        document.getElementById(
            'mobileSidebar'
        );


    const overlay =
        document.getElementById(
            'mobileOverlay'
        );


    if (sidebar) {

        sidebar.classList.remove(
            'active'
        );

    }


    if (overlay) {

        overlay.classList.remove(
            'active'
        );

    }


    document.body.style.overflow =
        '';

}


// ======================================================
// HIDE / SHOW HEADER
// ======================================================

let headerIsHidden = false;


// ======================================================
// CREATE HIDE HEADER BUTTON
// ======================================================

function createHideHeaderButton() {

    let button =
        document.getElementById(
            'hideHeaderBtn'
        );


    // If button already exists,
    // don't create another one.

    if (button) {

        return button;

    }


    button =
        document.createElement(
            'button'
        );


    button.id =
        'hideHeaderBtn';


    button.type =
        'button';


    button.textContent =
        'Hide Header';


    // ==================================================
    // BUTTON STYLE
    // ==================================================

    button.style.position =
        'fixed';

    button.style.top =
        '12px';

    button.style.right =
        '12px';

    button.style.zIndex =
        '999999';


    button.style.padding =
        '10px 18px';


    button.style.border =
        '2px solid #333';


    button.style.borderRadius =
        '8px';


    button.style.background =
        '#ffffff';


    button.style.color =
        '#222222';


    button.style.fontSize =
        '15px';


    button.style.fontWeight =
        '600';


    button.style.cursor =
        'pointer';


    button.style.boxShadow =
        '0 2px 8px rgba(0,0,0,0.20)';


    document.body.appendChild(
        button
    );


    return button;

}


// ======================================================
// FIND HEADER
// ======================================================

function getPageHeaderElements() {

    const elements = [];


    // --------------------------------------------------
    // HEADER TAG
    // --------------------------------------------------

    document
        .querySelectorAll('header')
        .forEach(function (el) {

            if (!elements.includes(el)) {

                elements.push(el);

            }

        });


    // --------------------------------------------------
    // COMMON HEADER CLASSES / IDS
    // --------------------------------------------------

    const headerSelectors = [

        '#header',

        '#siteHeader',

        '#mainHeader',

        '.header',

        '.site-header',

        '.main-header',

        '.navbar',

        '.navigation',

        '.top-header',

        '.site-nav',

        '.main-nav'

    ];


    headerSelectors.forEach(
        function (selector) {

            document
                .querySelectorAll(selector)
                .forEach(function (el) {

                    if (
                        !elements.includes(el)
                    ) {

                        elements.push(el);

                    }

                });

        }
    );


    // --------------------------------------------------
    // HERO / TITLE SECTION
    // --------------------------------------------------

    const heroSelectors = [

        '#hero',

        '#heroSection',

        '#hero-section',

        '.hero',

        '.hero-section',

        '.heroSection',

        '.banner',

        '.hero-banner',

        '.main-banner'

    ];


    heroSelectors.forEach(
        function (selector) {

            document
                .querySelectorAll(selector)
                .forEach(function (el) {

                    if (
                        !elements.includes(el)
                    ) {

                        elements.push(el);

                    }

                });

        }
    );


    return elements;

}


// ======================================================
// HIDE HEADER
// ======================================================

function hidePageHeader() {

    const elements =
        getPageHeaderElements();


    elements.forEach(
        function (element) {

            // Save original display

            if (
                !element.dataset.headerOriginalDisplay
            ) {

                element.dataset.headerOriginalDisplay =
                    element.style.display || '';

            }


            element.style.display =
                'none';

        }
    );


    headerIsHidden =
        true;


    const button =
        document.getElementById(
            'hideHeaderBtn'
        );


    if (button) {

        button.textContent =
            'Show Header';

    }

}


// ======================================================
// SHOW HEADER
// ======================================================

function showPageHeader() {

    const elements =
        getPageHeaderElements();


    elements.forEach(
        function (element) {

            if (
                element.dataset.headerOriginalDisplay
                !== undefined
            ) {

                element.style.display =
                    element.dataset.headerOriginalDisplay;

            }

            else {

                element.style.display =
                    '';

            }

        }
    );


    headerIsHidden =
        false;


    const button =
        document.getElementById(
            'hideHeaderBtn'
        );


    if (button) {

        button.textContent =
            'Hide Header';

    }

}


// ======================================================
// TOGGLE HEADER
// ======================================================

function togglePageHeader() {

    if (
        headerIsHidden === false
    ) {

        hidePageHeader();

    }

    else {

        showPageHeader();

    }

}


// ======================================================
// PAGE LOAD
// ======================================================

document.addEventListener(
    'DOMContentLoaded',
    function () {


        // ==============================================
        // DEFAULT
        // ==============================================

        columns = 17;

        resetMode = true;


        // ==============================================
        // INITIALIZE
        // ==============================================

        initState();


        // ==============================================
        // BUILD ABACUS
        // ==============================================

        buildAbacus();


        // ==============================================
        // CREATE HIDE HEADER BUTTON
        // ==============================================

        const hideHeaderBtn =
            createHideHeaderButton();


        if (hideHeaderBtn) {

            hideHeaderBtn.addEventListener(
                'click',
                togglePageHeader
            );

        }


        // ==============================================
        // RESET BUTTON
        // ==============================================

        const clearBtn =
            document.getElementById(
                'clearBtn'
            );


        if (clearBtn) {

            clearBtn.addEventListener(
                'click',
                clearAbacus
            );

        }


        // ==============================================
        // CLEAR RODS BUTTON
        // ==============================================

        const clearRodsBtn =
            document.getElementById(
                'clearRodsBtn'
            );


        if (clearRodsBtn) {

            clearRodsBtn.addEventListener(
                'click',
                clearRodsOnly
            );

        }


        // ==============================================
        // ROD COUNT
        // ==============================================

        const rodCount =
            document.getElementById(
                'rodCount'
            );


        if (rodCount) {

            rodCount.value = 17;


            rodCount.addEventListener(
                'change',
                handleRodCountChange
            );

        }


        // ==============================================
        // MOBILE MENU
        // ==============================================

        const mobileMenuBtn =
            document.getElementById(
                'mobileMenuBtn'
            );


        if (mobileMenuBtn) {

            mobileMenuBtn.addEventListener(
                'click',
                openMobileSidebar
            );

        }


        // ==============================================
        // CLOSE MOBILE MENU
        // ==============================================

        const closeMenuBtn =
            document.getElementById(
                'closeMenuBtn'
            );


        if (closeMenuBtn) {

            closeMenuBtn.addEventListener(
                'click',
                closeMobileSidebar
            );

        }


        // ==============================================
        // MOBILE OVERLAY
        // ==============================================

        const mobileOverlay =
            document.getElementById(
                'mobileOverlay'
            );


        if (mobileOverlay) {

            mobileOverlay.addEventListener(
                'click',
                closeMobileSidebar
            );

        }

    }
);