document.querySelectorAll('[id$="-morality"]').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Tally morality answers
        const answers = { good: 0, neutral: 0, evil: 0 };
        for (let i = 7; i <= 9; i++) {
            const selected = event.target.querySelector(`input[name="q${i}"]:checked`);
            if (selected) answers[selected.value]++;
        }

        // Determine dominant morality
        const morality = answers.good >= 2 ? 'good' :
            answers.neutral >= 2 ? 'neutral' :
                answers.evil >= 2 ? 'evil' : 'mixed';

        // Hide the form
        event.target.style.display = 'none';

        // Display result if morality is clear
        if (morality !== 'mixed') {
            const key = `${politicalCategory}-${lawfulness}-${morality}`;
            const results = {
                // Democrat Results
                'democrat-lawful-good': 'You are a steadfast champion of the demos, weaving the will of the people into a tapestry of just laws. In the agora, your voice rises to protect the weak, ensuring that Solon’s spirit of equity endures. Your polis stands as a beacon of order and benevolence.',
                'democrat-lawful-neutral': 'You are a meticulous steward of the demos, enforcing the assembly’s decrees with unwavering precision. Your polis thrives on stability, its laws a shield against disorder, though individual plights may fade beneath your focus on structure.',
                'democrat-lawful-evil': 'You are a cunning architect of the demos, twisting the laws of the assembly to bind the people to your will. Your polis runs like a machine, its order a facade for your dominance, with dissenters crushed beneath your legal machinations.',
                'democrat-neutral-good': 'You are a compassionate voice in the agora, guiding the demos with a flexible hand toward a brighter future. Laws bend to serve the greater good, fostering a polis where hope flourishes amid practical compromise.',
                'democrat-neutral-neutral': 'You are a pragmatic mediator of the demos, balancing the assembly’s cries with the needs of the moment. Your polis endures through adaptability, guided by neither grand ideals nor rigid rules.',
                'democrat-neutral-evil': 'You are a sly manipulator within the demos, turning debates into a stage for your ambition. Your polis bends to your schemes, its people unwitting pawns in a game where order serves only your gain.',
                'democrat-chaotic-good': 'You are a fiery liberator of the demos, igniting the people’s passion to cast off old chains. Your polis pulses with freedom, its laws mere suggestions in your relentless drive to uplift the downtrodden through upheaval.',
                'democrat-chaotic-neutral': 'You are a wild spirit of the demos, reveling in the untamed will of the assembly. Your polis is a tempest of voices, unbound by tradition or constraint, shaped by the raw energy you unleash.',
                'democrat-chaotic-evil': 'You are a dark whirlwind within the demos, sowing discord to reap power from the ashes of order. Your polis trembles under your anarchic sway, its people free only to serve your cruel whims.',

                // Oligarch Results
                'oligarch-lawful-good': 'You are a noble pillar of the polis, upholding ancient laws to shield both rich and poor under your care. Your rule ensures prosperity flows from the elite to the masses, guided by traditions honoring the gods and the people.',
                'oligarch-lawful-neutral': 'You are a stern guardian of the polis, enforcing old codes to preserve the dominance of the noble few. Your rule is a bastion of order, its rigid structure a testament to your lineage’s enduring power.',
                'oligarch-lawful-evil': 'You are a cold sovereign of the polis, wielding the elders’ laws as a yoke upon the masses. Your rule fortifies the elite, its traditions a weapon to hoard wealth and crush opposition.',
                'oligarch-neutral-good': 'You are a wise benefactor among the elite, bending tradition to ease the burdens of the downtrodden. Your rule blends noble privilege with mercy, crafting a city where order serves the welfare of all.',
                'oligarch-neutral-neutral': 'You are a shrewd arbiter of the polis, steering the noble council with a practical hand. Your rule balances the elite’s interests with the moment’s needs, ensuring your family’s power endures through flexibility.',
                'oligarch-neutral-evil': 'You are a crafty schemer among the elite, exploiting noble privilege to tighten your grip on the polis. Your rule is a web of alliances and betrayals, its people mere tools to enrich your house.',
                'oligarch-chaotic-good': 'You are a rebellious scion of the elite, shattering old hierarchies to lift the polis from stagnation. Your rule defies the council’s norms, its chaos a forge for a new order where nobility serves the common good.',
                'oligarch-chaotic-neutral': 'You are an untamed force among the elite, wielding your status with reckless abandon. Your rule is a storm of noble whims, its people caught in the unpredictable wake of your defiance.',
                'oligarch-chaotic-evil': 'You are a savage prince of the polis, tearing through the noble order to claim all for yourself. Your rule is a reign of terror, its chaos a crucible where your enemies burn and your power rises.',

                // Tyrant Results
                'tyrant-lawful-good': 'You are a resolute sovereign of the polis, forging a legal order that lifts the people under your benevolent hand. Your rule is a disciplined harmony, its decrees a path to prosperity for a city that reveres your name.',
                'tyrant-lawful-neutral': 'You are a firm autocrat of the polis, binding all to your unyielding edicts with clinical precision. Your rule is an iron framework, its people safe but subject to the cold logic of your absolute command.',
                'tyrant-lawful-evil': 'You are a merciless despot of the polis, crafting laws to chain the people to your ambition. Your rule is a fortress of order, its citizens mere cogs in a machine that feeds your hunger for control.',
                'tyrant-neutral-good': 'You are a pragmatic savior of the polis, seizing power to guide its people to a better dawn. Your rule blends bold action with care, its shifting ways a means to heal a fractured city.',
                'tyrant-neutral-neutral': 'You are a calculating ruler of the polis, wielding power with a steady, uncommitted hand. Your rule adapts to each challenge, its people neither exalted nor oppressed, but kept in line by your practical will.',
                'tyrant-neutral-evil': 'You are a ruthless opportunist of the polis, turning every crisis into a step toward greater dominion. Your rule is a dance of cunning, its people pawns in a game where only your triumph matters.',
                'tyrant-chaotic-good': 'You are a bold liberator of the polis, toppling old powers to free its people in a blaze of upheaval. Your rule is a chaotic hymn to justice, its unpredictability a price for the hope you bring.',
                'tyrant-chaotic-neutral': 'You are an erratic monarch of the polis, ruling through caprice and unshackled will. Your rule is a whirlwind of freedom and folly, its people swept along by the untamed force of your desires.',
                'tyrant-chaotic-evil': 'You are a tempest of tyranny, sweeping through the polis with ferocity unbound. Laws bend or break at your whim, and your enemies’ ashes fertilize your fields of power. Your rule is a dark hymn of chaos, sung by a people too broken to resist.'
            };

            // Display the result
            document.getElementById('results').innerHTML = `<h2>Your Path Revealed</h2><p>${results[key]}</p>`;
            document.getElementById('results').style.display = 'block';
        } else {
            // Handle mixed morality
            document.getElementById('results').innerHTML = '<p>Your moral path is too conflicted to define clearly.</p>';
            document.getElementById('results').style.display = 'block';
        }
    });
});