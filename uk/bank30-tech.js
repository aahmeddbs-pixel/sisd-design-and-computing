/* Study Plus UK · extra revision questions (Computing, ICT, Psychology, Maths topics without a generator).
   Format: see uk/bank30-sci.js. Appended to the END of each topic's pool. */
(function(){
const B = (k, t) => window.SPBANK(window.UK, k, t);

B("y8computing/algorithms", `
m1|What is an algorithm?|A step-by-step set of instructions to solve a problem|A computer|A programming language|A type of data|Recipes are algorithms.
m1|What is decomposition?|Breaking a problem into smaller parts|Removing detail|Spotting patterns|Writing code|One of the computational thinking skills.
m2|What is abstraction?|Removing unnecessary detail to focus on what matters|Breaking a problem down|Testing code|Drawing flowcharts|A tube map is an abstraction.
m2|Which flowchart shape shows a decision?|Diamond|Rectangle|Oval|Parallelogram|Decisions have Yes/No branches.
m2|What does a linear search do?|Checks each item one by one|Splits the list in half|Sorts the list|Deletes items|Works on unsorted lists.
m2|What must be true for a binary search?|The list must be sorted|The list must be short|The list must be unsorted|Only numbers|It halves the search space each time.
m3|In a bubble sort, what happens in each pass?|Adjacent items are compared and swapped if in the wrong order|The list is split|One item is removed|Items are counted|Repeat until no swaps.
m3|What is iteration?|Repeating steps (a loop)|Making a decision|Running once|Storing data|E.g. FOR and WHILE loops.
m3|What is selection in an algorithm?|Choosing a path based on a condition|Repeating|Sorting|Storing|IF … THEN … ELSE.
t2|Pseudocode is a way to plan algorithms in plain, code-like English.|T|It isn't a real programming language.
`);
B("y8computing/python", `
m1|What does print("Hi") do in Python?|Displays Hi on the screen|Asks the user a question|Stores Hi|Deletes Hi|print() outputs text.
m1|Which Python function gets text typed by the user?|input()|print()|int()|len()|input() always returns a string.
m1|What is a variable?|A named store for data|A loop|An error|A function only|E.g. score = 0.
m2|What does int("5") do?|Converts the string "5" into the integer 5|Prints 5|Makes 5 a string|Adds 5|Needed before doing maths with input.
m2|What is the output of print(7 // 2)?|3|3.5|4|1|// is integer (floor) division.
m2|What is the output of print(7 % 2)?|1|3|3.5|0|% gives the remainder.
m2|Which line starts a loop that runs 5 times?|for i in range(5):|for i in 5:|loop 5:|while 5:|range(5) gives 0 to 4.
m2|Which symbol checks if two values are equal in Python?|==|=|!=|=>|= assigns; == compares.
m2|What data type is 3.14?|float|integer|string|Boolean|Floats have decimal points.
m3|What is wrong with: if score > 10 print("Win")|A colon is missing after the condition|print is wrong|> should be <|Nothing|if score > 10:
m3|What does len("hello") return?|5|4|6|hello|It counts characters.
m3|What is the output? x = 3 then x = x + 2 then print(x)|5|3|2|x + 2|x is updated to 5.
m3|Why is indentation important in Python?|It shows which lines belong inside loops and if statements|It's decoration|It speeds code|It's optional always|Wrong indentation causes errors.
t2|A while loop repeats as long as its condition is True.|T|Make sure it can become False!
`);
B("y8computing/networks", `
m1|What is a LAN?|A network covering a small area like a school|A worldwide network|A website|A cable type|Local Area Network.
m2|What is an IP address?|A unique number identifying a device on a network|A website name|A password|A cable|E.g. 192.168.1.10.
m2|What does a web browser do?|Requests and displays web pages|Stores the internet|Routes data|Makes Wi-Fi|E.g. Chrome, Safari, Edge.
m3|What is a packet?|A small piece of data sent across a network|A cable|A whole file at once|A router|Packets may take different routes.
m3|What is bandwidth?|The amount of data that can be sent per second|Cable length|Number of users|Screen size|Measured in Mbps.
t2|A firewall can block unauthorised network traffic.|T|It checks data coming in and out.
`);

B("y10computing/architecture", `
m2|What does the ALU do?|Performs arithmetic and logic operations|Stores programs|Controls input|Fetches instructions|Arithmetic Logic Unit.
m2|What is the role of the control unit?|Coordinates the fetch-decode-execute cycle|Stores data permanently|Performs calculations|Outputs sound|It sends control signals.
m3|What is cache memory?|Very fast memory close to the CPU for frequently used data|Backing storage|A hard drive|ROM|More cache = fewer slow RAM fetches.
m3|What is virtual memory?|Part of secondary storage used as extra RAM when RAM is full|Cache|ROM|Cloud storage|It is much slower than RAM.
m3|Why does increasing clock speed improve performance?|More instructions can be executed per second|It uses less power|It adds storage|It cools the CPU|Measured in GHz.
t2|Von Neumann architecture stores data and instructions in the same memory.|T|This is the stored program concept.
`);
B("y10computing/networks", `
m2|What is a protocol?|A set of rules for communication between devices|A cable|A router|A virus|E.g. TCP/IP, HTTP.
m2|What does HTTPS add to HTTP?|Encryption for secure communication|Faster speeds|Images|Email|The S stands for Secure.
m3|What is the role of DNS?|Translates domain names into IP addresses|Encrypts data|Stores web pages|Blocks viruses|Like an internet phone book.
m3|What is a star topology?|All devices connect to a central switch|Devices in a ring|Devices on one cable|No connections|If one cable fails, only that device is affected.
m3|What is the difference between a MAC address and an IP address?|MAC is fixed to the hardware; IP is assigned by the network|They are identical|MAC changes daily|IP is fixed hardware|MAC addresses are 48-bit.
t2|Wired connections are generally more reliable than Wi-Fi.|T|Less interference.
`);
B("y10computing/algorithms", `
m2|What is a subprogram?|A named block of code that can be called when needed|A loop|A variable|An error|Functions and procedures are subprograms.
m2|What is the difference between a function and a procedure?|A function returns a value; a procedure doesn't|They're identical|Procedures return values|Functions can't have parameters|Both reduce repeated code.
m2|What is a syntax error?|Breaking the rules of the programming language|A wrong result|A slow program|A crash in hardware|E.g. a missing bracket.
m3|What is a logic error?|The program runs but gives the wrong result|A typing error|The program won't start|A hardware fault|E.g. using < instead of <=.
m3|What is a trace table used for?|Following variable values as an algorithm runs|Drawing graphs|Sorting|Storing files|It helps find logic errors.
m3|What is merge sort?|Splitting a list into halves repeatedly, then merging in order|Swapping neighbours|Checking items one by one|Random sorting|It's faster than bubble sort for large lists.
m3|What is a 2D array?|A table of data with rows and columns|A single variable|A loop|A string|Accessed with two indexes.
t2|Validation checks that input is sensible.|T|E.g. range and length checks.
`);
B("y10computing/impact", `
m1|What is the digital divide?|The gap between people with and without access to technology|A broken screen|A network split|A file format|Affects education and jobs.
m2|What is planned obsolescence?|Designing products to become outdated quickly|Making them last forever|Recycling|A software licence|It increases e-waste.
m2|What is cyberbullying?|Bullying using digital technology|A virus|A hacking tool|A firewall|Report and block; keep evidence.
m2|Why is data privacy important?|Personal data can be misused for fraud or tracking|It isn't|It speeds computers|It's only for companies|Laws like GDPR protect it.
m2|What is a Creative Commons licence?|Lets creators allow others to reuse work with conditions|Bans all copying|A virus|A hardware licence|E.g. 'attribution required'.
m3|What is a benefit of AI in healthcare?|Faster, accurate analysis of scans|No need for doctors ever|It never makes mistakes|It's free|Doctors still check results.
m3|What is one environmental benefit of technology?|Smart systems can reduce energy use|More e-waste|More mining|Higher emissions|E.g. smart thermostats.
m3|What is surveillance technology's main ethical concern?|Invasion of privacy|Too much battery use|Being too cheap|Being slow|E.g. CCTV and facial recognition.
m3|What is a 'filter bubble'?|Algorithms showing you only content you already agree with|A type of firewall|A virus|A screen protector|It can limit balanced views.
m3|Why do companies collect user data?|To target adverts and improve services|To delete it|For fun|It's illegal|Users should read privacy policies.
m3|What is a deepfake?|AI-generated fake video or audio of real people|A computer virus|A data backup|A strong password|It can spread misinformation.
t2|Recycling electronics recovers valuable metals.|T|E.g. gold and copper.
`);

B("y10ict/systems", `
m1|Which device is used to input sound?|Microphone|Speaker|Printer|Monitor|Speakers output sound.
m1|What does CPU stand for?|Central Processing Unit|Computer Power Unit|Central Program Utility|Control Processing Unit|It processes instructions.
m1|What is a GUI?|A graphical user interface with icons and windows|A command line|A printer|A cable|Easy for beginners.
m2|What is a CLI?|A command line interface where users type commands|A touch screen|A mouse|A GUI|Faster for experts, harder to learn.
m2|Which storage is optical?|Blu-ray disc|SSD|Hard disk|Memory card|Read by a laser.
m2|What is a sensor?|An input device that measures physical quantities|An output device|A printer|A storage device|E.g. temperature, light.
m2|What is an actuator?|An output device that causes movement|A sensor|A keyboard|A disk|E.g. motors in robots.
m2|What is a touchscreen?|An input and output device|Only input|Only output|Storage|You see and touch it.
m2|Why are tablets popular?|Portable with touchscreens and long battery life|Very large keyboards|Need cables|Heavy|But less powerful than desktops.
m3|What is a disadvantage of an inkjet printer for large volumes?|Slow and ink cartridges are expensive per page|Very fast|Cheap per page|Uses toner|Laser printers suit large volumes.
m3|What is a 3D printer used for?|Making solid objects layer by layer|Printing photos|Scanning|Copying text|E.g. prototypes and prosthetics.
m3|What is a chip-and-PIN reader?|A device reading a bank card's chip, verified with a PIN|A barcode reader|A scanner|A webcam|Contactless uses RFID/NFC.
m3|What is a smart device?|A device connected to the internet that can be controlled remotely|An old phone|A printer only|A cable|Part of the IoT.
m3|What is utility software?|Software that maintains the computer, e.g. antivirus or backup|A game|A word processor|A web page|It helps the system run well.
m3|What is a benefit of voice recognition?|Hands-free input|Always accurate|Works in noise|No training needed|Accents and noise can cause errors.
t2|ROM keeps its contents when the power is off.|T|It holds the boot program.
`);
B("y10ict/networks", `
m1|What is Wi-Fi?|Wireless networking using radio waves|A cable|A website|A virus|Connects devices to a network.
m1|What is Bluetooth best for?|Short-range connections between nearby devices|Long-distance networks|Satellites|Printing only|E.g. headphones.
m2|What is a WAN?|A network covering a large geographical area|A home network|A cable|A server|The internet is the biggest WAN.
m2|What is a server?|A computer that provides services or files to other computers|A printer|A user|A mouse|E.g. file or web servers.
m2|What is an advantage of a network?|Sharing files, printers and internet access|More viruses|Slower computers|Higher costs only|Also central backups.
m2|What is a password's weakness?|It can be guessed or stolen|It is too secure|It's biometric|It never changes|Use strong, unique passwords.
m2|What is a strong password?|Long, with a mix of letters, numbers and symbols|Your name|123456|password|Avoid personal information.
m3|What is a disadvantage of video conferencing?|Time zones and poor connections can disrupt it|Saves travel|Quick to arrange|Cheaper|It also lacks body language.
m3|What is authentication?|Checking a user's identity|Encrypting data|Deleting data|Copying files|E.g. passwords, biometrics.
m3|What is an ISP?|An Internet Service Provider|A type of virus|A router|A web page|They connect you to the internet.
m3|Why might a hospital use an intranet?|To share private information securely with staff only|To advertise|To play games|For public use|Access is restricted.
t2|Cloud storage stores files on remote servers.|T|Accessed over the internet.
x2|What does LAN stand for?|Local Area Network|A small, local network.
`);
B("y10ict/safety", `
m1|Why shouldn't you share your password?|Others could access your account|It is too long|It slows the computer|It's illegal|Keep it private.
m1|What should you do with a suspicious email attachment?|Don't open it; report or delete it|Open it|Forward it|Reply|It may contain malware.
m2|What is spyware?|Software that secretly records your activity|A firewall|An antivirus|A browser|E.g. keyloggers.
m2|What is a digital footprint?|The trail of data you leave online|A virus|A password|A photo only|It can be hard to delete.
m2|What is a hacker?|Someone who gains unauthorised access to a system|A programmer|A tester|A user|Hacking is illegal.
m2|Why are software updates important?|They fix security vulnerabilities|They slow the computer|They delete files|They're optional always|Install them regularly.
m2|What is a secure website indicator?|A padlock and https in the address bar|A pop-up|Lots of ads|A free prize|Still be careful.
m3|What is a 'man-in-the-middle' risk on public Wi-Fi?|Someone intercepting your data|Faster speeds|More privacy|No risk|Use a VPN on public Wi-Fi.
m3|What is a virus?|Malicious code that replicates and spreads by attaching to files|A firewall|A strong password|A backup|Antivirus software detects it.
m3|What is an audit trail?|A record of who accessed or changed data and when|A virus|A backup|A password|It helps detect misuse.
m3|What is a back-up?|A copy of data kept in case the original is lost|A virus|A password|A firewall|Keep backups in a different place.
t2|Typing a URL yourself is safer than clicking a link in an unexpected email.|T|Links can lead to fake sites.
`);
B("y10ict/lifecycle", `
m1|What happens in the design stage?|Inputs, outputs, file structures and validation are planned|The system is used|It's evaluated|Users are interviewed|Design comes after analysis.
m1|What is user documentation?|Instructions showing users how to use the system|Code comments|A virus|Test data|E.g. how to log in.
m2|What is a data flow diagram?|A diagram showing how data moves through a system|A flowchart of a loop|A graph|A database|Used in analysis and design.
m2|What is a disadvantage of observation in analysis?|People may behave differently when watched|It's fast|It's cheap|It's accurate always|Also time-consuming.
m2|What is a disadvantage of direct changeover?|If the new system fails, there is no backup|It's slow|It's expensive|It needs two systems|Risky but quick.
m2|What is phased implementation?|Introducing the new system one part at a time|Switching all at once|Running both|One branch only|Problems can be fixed in each phase.
m2|What is a length check?|Validation that data has the right number of characters|A range check|A spelling check|Double entry|E.g. a password at least 8 characters.
m3|What is a format (picture) check?|Validation that data follows a pattern, e.g. AA99 9AA|Range check|Type check|Presence check|E.g. postcodes.
m3|What is a type check?|Validation that data is the right data type|Length check|Range check|Visual check|E.g. numbers only for age.
m3|What does evaluation compare?|The new system against the original requirements|Two viruses|Prices only|Users' ages|And gathers user feedback.
m3|What is a GPS used for?|Calculating location using satellite signals|Storing files|Printing|Sending emails|Used in sat-navs.
m3|What is an ATM?|A machine that lets customers withdraw cash and check balances|A printer|A sensor|A database|Automated Teller Machine.
t2|Robots are used in car manufacturing for consistent, accurate work.|T|They can work 24/7.
`);
B("y10ict/databases", `
m1|What is a table in a database?|A set of records about one type of thing|A chart|A query|A report|E.g. a Students table.
m1|What is a query?|A search for records that match criteria|A table|A field|A key|Results can be sorted.
m2|What is a foreign key?|A field in one table that links to a primary key in another|A password|A unique ID only|A report|It creates relationships.
m2|What is a relational database?|A database with linked tables|A single table|A spreadsheet|A list|Reduces data duplication.
m2|What does a report do?|Presents data in a formatted, printable way|Searches data|Stores data|Deletes data|Often from a query.
m2|What is a form in a database?|A user-friendly screen for entering or viewing data|A table|A query|A key|It can include validation.
m2|Which data type should a phone number use?|Text|Number|Boolean|Date|Leading zeros and spaces would be lost as numbers.
m3|What does the query 'Price >= 10 AND Price <= 20' find?|Records priced from 10 to 20 inclusive|Under 10|Over 20|All records|Both conditions must be true.
m3|What does the wildcard * do in a search like 'S*'?|Matches any characters after S|Matches only S|Deletes S|Sorts S|E.g. Smith, Sam.
m3|What is a header in HTML web pages?|The <head> section holding the title and links to styles|The main content|A footer|An image|The <title> appears in the browser tab.
m3|Which HTML tag makes a numbered list?|<ol>|<ul>|<li> only|<table>|<ul> makes bullets.
m3|What does a CSS class let you do?|Apply the same style to many elements|Make a database|Add a link|Store files|Use .classname in the stylesheet.
m3|What is the purpose of a hyperlink's target="_blank"?|Opens the link in a new tab or window|Makes it bold|Deletes it|Hides it|Useful for external sites.
t2|Sorting a database in descending order puts the highest values first.|T|Ascending is lowest first.
`);

B("y10psychology/development", `
m1|What is the sensorimotor stage?|0–2 years: learning through senses and movement|Logical thinking|Abstract thought|Language only|Object permanence develops.
m1|What is conservation?|Understanding quantity stays the same when appearance changes|Saving water|Remembering|Egocentrism|Develops in the concrete operational stage.
m2|What is a schema in Piaget's theory?|A mental structure of knowledge|A brain area|A test|A reward|Schemas grow through experience.
m2|What is assimilation?|Fitting new information into an existing schema|Changing a schema|Forgetting|Learning to walk|E.g. calling a cat a 'dog' at first.
m2|What is accommodation?|Changing a schema to fit new information|Ignoring new information|Assimilation|Memory loss|Equilibrium is restored.
m2|What did the Three Mountains task test?|Egocentrism|Conservation|Object permanence|Memory|Piaget and Inhelder, 1956.
m2|What is a fixed mindset?|Believing intelligence can't change|Believing effort helps|Loving challenge|A growth mindset|It can make people avoid challenges.
m3|What did Hughes' policeman doll study suggest?|Children can decentre earlier than Piaget thought when tasks make sense|Piaget was entirely right|Children never decentre|Mindsets are fixed|It used a more meaningful task.
m3|How does the brain develop in the womb?|The brain and nervous system form from the neural tube|After birth only|From the heart|From muscles|Neurons multiply rapidly.
m3|What is a strength of Dweck's research?|It has useful applications for teaching and praise|It's purely biological|It ignores effort|It has no evidence|Mindset interventions in schools.
m3|What is meant by 'nature'?|Inherited, genetic influences|The environment|Parenting|School|Nurture is the environment.
m3|What is an ethical issue in studying children?|Gaining parental consent and avoiding distress|Paying them|Using adults|Large samples|Children can't give full consent.
t2|Piaget believed children's thinking changes in stages.|T|Each stage has different abilities.
`);
B("y10psychology/memory", `
m1|What is retrieval?|Getting information out of memory|Storing it|Encoding it|Forgetting|Recall and recognition.
m1|What is storage?|Holding information in memory over time|Taking it in|Getting it out|Losing it|Long-term memory is unlimited.
m1|What is semantic memory?|Memory for facts and knowledge|Memory for events|Memory for skills|Short-term memory|E.g. Paris is the capital of France.
m2|What is encoding?|Changing information into a form that can be stored|Getting it back|Forgetting|Sleeping|Visual, acoustic or semantic encoding.
m2|What is the capacity of long-term memory?|Potentially unlimited|7 items|30 seconds|5 items|It stores a lifetime.
m2|What is the duration of sensory memory?|Less than a second to a few seconds|Forever|30 minutes|A day|Most fades unless attended to.
m2|What is retrograde amnesia?|Losing memories from before the damage|Not forming new memories|Perfect memory|Forgetting skills only|Often after head injury.
m2|What is chunking?|Grouping items to fit more into STM|Forgetting|Rehearsal|Encoding|E.g. phone numbers in groups.
m2|What is acoustic encoding?|Storing information by sound|By meaning|By image|By smell|STM tends to use acoustic encoding.
m3|What is recognition?|Identifying information when you see it again|Recall without cues|Encoding|Forgetting|Easier than free recall.
m3|What does the serial position effect show?|Items at the start and end of a list are remembered best|Middle items are best|All items equal|Last items forgotten|Primacy and recency effects.
m3|What is the primacy effect?|Better recall of the first items in a list|Better recall of the last items|Forgetting|Chunking|Early items are rehearsed more.
m3|What is a weakness of using case studies like HM?|Results may not generalise to everyone|They're too large|They're lab experiments|They're too cheap|One unusual individual.
m3|How could a student use memory research to revise?|Space out practice, test themselves and use meaningful links|Cram the night before|Read once|Highlight everything|Retrieval practice strengthens memory.
m3|What did Bartlett's participants do to the 'War of the Ghosts' story?|Shortened it and changed unfamiliar details|Remembered it perfectly|Made it longer|Translated it|Schemas shaped recall.
t2|Procedural memories are often hard to put into words.|T|E.g. explaining how to balance on a bike.
x1|What does STM stand for?|short-term memory/short term memory|It lasts about 18–30 seconds without rehearsal.
`);
B("y10psychology/brain", `
m1|What is a neuron?|A nerve cell that transmits electrical impulses|A brain lobe|A hormone|A muscle|Billions in the brain.
m1|Which lobe processes hearing?|Temporal|Occipital|Parietal|Frontal|It also helps with memory.
m1|Which lobe processes touch and spatial awareness?|Parietal|Temporal|Occipital|Frontal|It receives sensory information.
m2|What is a sensory neuron?|Carries impulses from receptors to the CNS|From CNS to muscles|Between neurons in the CNS|A muscle cell|Motor neurons go to muscles.
m2|What is a motor neuron?|Carries impulses from the CNS to muscles|From receptors|Within the brain only|A sensory cell|It causes movement.
m2|What is a relay neuron?|Connects sensory and motor neurons in the CNS|A muscle|A sense organ|A hormone|Found in the brain and spinal cord.
m2|What is a reflex arc?|A fast, automatic pathway from receptor to effector|A thought|A memory|A brain scan|It often bypasses conscious thought.
m2|What is an excitatory neurotransmitter?|One that makes the next neuron more likely to fire|One that stops firing|A hormone|A muscle|Inhibitory ones do the opposite.
m3|What is neuroplasticity?|The brain's ability to change and form new connections|Brain damage|A brain scan|A lobe|E.g. after learning or injury.
m3|What did Sperry's split-brain research suggest?|The two hemispheres have different functions|The brain works as one|Memory is in the heart|Lobes are identical|Patients had their corpus callosum cut.
m3|What is a PET scan?|A scan using a radioactive tracer to show brain activity|An X-ray|A CT scan|An ECG|It shows active areas.
m3|What is the corpus callosum?|The band of fibres connecting the two hemispheres|A lobe|A neuron|The spinal cord|It allows communication between hemispheres.
m3|What is an advantage of brain scans?|They show the living brain non-invasively|They're cheap|They are always perfect|They show thoughts directly|But they're expensive.
t2|The somatic nervous system controls voluntary movement.|T|The autonomic controls involuntary functions.
`);
B("y10psychology/social", `
m1|What is a bystander?|Someone who sees an incident but isn't involved|A victim|A police officer|A leader|They may or may not help.
m1|What is a crowd?|A large group of people in one place|A family|A team only|Two people|Crowds can behave pro- or anti-socially.
m2|What is the bystander effect?|People are less likely to help when others are present|More help in crowds|Helping strangers always|Obedience|Diffusion of responsibility.
m2|What did Piliavin's subway study find?|People helped a collapsed 'victim' often, more for 'ill' than 'drunk'|No one helped|Only women helped|Groups never helped|A field study in New York (1969).
m2|What is a 'cost of helping'?|Danger, embarrassment or time lost|A reward|Praise|Money gained|Higher costs = less helping.
m2|What is social loafing?|Putting in less effort when working in a group|Working harder|Leading|Bullying|Individual effort is less visible.
m2|What is a legitimate authority?|Someone we believe has the right to give orders|A friend|A stranger only|A child|E.g. police, teachers.
m3|What is collectivism?|A culture valuing group goals over individual ones|Individualism|Selfishness|Anarchy|Collectivist cultures may conform more.
m3|What did Milgram's variation with the experimenter on the phone show?|Obedience dropped to about 20.5%|It rose|No change|Everyone obeyed|Proximity of authority matters.
m3|How could crowds be managed to prevent anti-social behaviour?|CCTV, stewards and reducing anonymity|More alcohol|Fewer exits|Darkness|Reducing deindividuation helps.
m3|What is a dispositional factor?|A personal characteristic, like personality|A situational factor|The setting|The uniform|E.g. authoritarian personality.
m3|What is a situational factor in obedience?|Features of the setting, like the presence of authority|Personality|Age|Genes|E.g. location or uniform.
m3|What is minority influence?|A small group changing the majority's views|Obedience|Conformity to a majority|Bystander effect|Consistency helps the minority.
t2|Wearing a mask or uniform can increase deindividuation.|T|Anonymity reduces personal responsibility.
`);
B("y10psychology/problems", `
m1|What is mental health?|Our emotional, psychological and social wellbeing|Only physical fitness|A disease|A medicine|Everyone has mental health.
m1|Which is a symptom of depression?|Persistent sadness|More energy|Better concentration|Constant happiness|Lasting at least two weeks for diagnosis.
m2|What is unipolar depression?|Depression without episodes of mania|With mania|Short-term sadness|Addiction|Bipolar disorder includes mania.
m2|What is substance misuse?|Using drugs or alcohol in harmful ways|Taking medicine as prescribed|Eating healthily|Exercise|It can lead to addiction.
m2|What is a 'twin study' used for?|Investigating genetic influences|Testing memory|Treating depression|Brain surgery|Identical twins share 100% of genes.
m2|What is a placebo?|A fake treatment with no active ingredient|A real drug|A therapy|A diagnosis|Used to test drug effectiveness.
m2|What is relapse?|Returning to a condition after improvement|A cure|A diagnosis|A placebo|Common in addiction.
m3|What is an aversion therapy for addiction?|Linking the substance with an unpleasant experience|Giving rewards|Talking only|Exercise|E.g. a drug causing sickness with alcohol.
m3|What does Ellis's ABC model describe?|Activating event, Beliefs, Consequences|Attention, Behaviour, Cognition|Anxiety, Brain, Chemicals|Action, Benefit, Cost|Used in cognitive explanations.
m3|What is a weakness of the biological explanation of depression?|It ignores life events and thinking patterns|It's too complex|It's untestable always|It has no evidence|Depression has many causes.
m3|Why is self-reported data on mental health sometimes unreliable?|People may hide or misjudge symptoms|It's always perfect|It's numerical|It's from scans|Social desirability bias.
m3|What is the impact of mental health problems on society?|Lost work days and pressure on health services|None|Higher productivity|Lower costs|Support saves money long term.
m3|What is CBT's main aim?|To change unhelpful thinking and behaviour|To cure with drugs|To analyse dreams|To use shocks|Short-term and practical.
m3|Why do clinicians use classification systems like ICD-11?|To make diagnosis consistent|To avoid diagnosis|To give drugs|To measure IQ|Reliability of diagnosis.
t2|Social learning theory suggests addiction can be learned by observing others.|T|E.g. copying role models.
`);
B("y10psychology/methods", `
m1|What is a sample?|The group of participants studied|The whole population|The results|The hypothesis|It should represent the target population.
m1|What is the dependent variable?|The variable that is measured|The variable changed|A random factor|The sample|It depends on the IV.
m2|What is a volunteer sample?|Participants who choose to take part, e.g. answering an advert|Random selection|Opportunity|Stratified|May be biased towards keen people.
m2|What is random sampling?|Every member of the target population has an equal chance of selection|Choosing friends|Using volunteers|Choosing the nearest|E.g. names from a hat.
m2|What is the mode?|The most common value|The middle value|The average|The range|There can be more than one mode.
n2|Scores: 3, 5, 5, 8, 9. What is the median?|5|The middle value of ordered data.
m2|What is an open question?|A question allowing a free answer|A yes/no question|A rating|A multiple choice|Gives qualitative data.
m2|What is a closed question?|A question with fixed answers|Free answer|An interview|An observation|Gives quantitative data.
m3|What is a pilot study?|A small trial run to check procedures|The main study|A case study|A survey|It helps fix problems first.
m3|What is a matched pairs design?|Participants are paired on key characteristics, one in each condition|Same people in both|Random groups|No groups|Reduces participant variables.
m3|What does 'validity' mean?|Whether a study measures what it claims to|Consistency|Ethics|Sample size|Ecological validity = real-life relevance.
m3|What is debriefing?|Explaining the true aims to participants afterwards|Paying participants|Recruiting|Testing|Especially after deception.
t2|Correlations cannot prove cause and effect.|T|A third variable may be involved.
`);

B("y8maths/transform", `
m1|What does a translation do?|Slides a shape without turning or flipping|Turns a shape|Flips a shape|Enlarges a shape|Described by a vector.
m1|What does a reflection do?|Flips a shape in a mirror line|Slides it|Turns it|Makes it bigger|The image is the same size.
m1|What does a rotation need to be fully described?|Angle, direction and centre of rotation|Only the angle|A vector|A scale factor|E.g. 90° clockwise about (0, 0).
m1|What does an enlargement change?|The size of the shape|Only the position|The angle sizes|The number of sides|Angles stay the same.
m2|Point (2, 5) is reflected in the x-axis. Where does it go?|(2, −5)|(−2, 5)|(5, 2)|(−2, −5)|The y-coordinate changes sign.
m2|Point (3, 4) is reflected in the y-axis. Where does it go?|(−3, 4)|(3, −4)|(4, 3)|(−3, −4)|The x-coordinate changes sign.
m2|Point (1, 2) is translated by vector (4, −3). New point?|(5, −1)|(−3, 5)|(4, −6)|(5, 5)|Add: (1 + 4, 2 − 3).
m2|A shape is enlarged by scale factor 3. A side was 4 cm. New side?|12 cm|7 cm|4 cm|1.3 cm|Multiply lengths by 3.
m2|How many lines of symmetry does a square have?|4|2|1|8|Two diagonals and two through the midpoints.
m2|What is the order of rotational symmetry of an equilateral triangle?|3|1|2|6|It looks the same 3 times in a full turn.
m3|Point (2, 3) is rotated 180° about the origin. New point?|(−2, −3)|(3, 2)|(−3, −2)|(2, −3)|Both signs change.
m3|Point (4, 1) is rotated 90° anticlockwise about the origin. New point?|(−1, 4)|(1, −4)|(−4, 1)|(4, −1)|(x, y) → (−y, x).
m3|Which transformation produces congruent shapes?|Translation, rotation and reflection|Enlargement only|None|Enlargement and reflection|Congruent = same shape and size.
m3|Point (1, 1) is enlarged by scale factor 2 about the origin. New point?|(2, 2)|(1, 2)|(3, 3)|(2, 1)|Multiply coordinates by 2 (centre at the origin).
m3|The mirror line y = x reflects (5, 2) to…|(2, 5)|(−5, 2)|(5, −2)|(−2, −5)|Swap x and y.
t2|A shape and its reflection are congruent.|T|Same size and shape.
`);
B("y10maths/vectors", `
m1|What does a column vector (3, 2) mean?|3 right and 2 up|3 up and 2 right|3 left and 2 down|A point at (3, 2)|Top number is horizontal.
m1|What does vector (−4, 1) mean?|4 left and 1 up|4 right and 1 up|4 left and 1 down|1 left and 4 up|Negative x = left.
m2|a = (2, 3), b = (1, −4). What is a + b?|(3, −1)|(1, 7)|(3, 7)|(2, −12)|Add the components.
m2|a = (5, 1), b = (2, 4). What is a − b?|(3, −3)|(7, 5)|(3, 3)|(−3, 3)|Subtract the components.
m2|a = (3, −2). What is 2a?|(6, −4)|(5, 0)|(6, 4)|(3, −4)|Multiply each component by 2.
n2|What is the magnitude of vector (3, 4)?|5|√(3² + 4²) = √25 = 5.
n2|What is the magnitude of vector (6, 8)?|10|√(36 + 64) = 10.
m2|What does −a mean?|The same length as a but in the opposite direction|Half of a|a reversed in length only|Nothing|Multiply each component by −1.
m3|If AB = a and BC = b, what is AC?|a + b|a − b|b − a|2a|Go from A to B then B to C.
m3|If OA = a and OB = b, what is AB?|b − a|a − b|a + b|−a − b|AB = AO + OB = −a + b.
m3|M is the midpoint of AB, where AB = 2b. What is AM?|b|2b|½b|4b|Half of AB.
m3|Two vectors are parallel if…|One is a multiple of the other|They have the same first number|They add to zero|They are both positive|E.g. (2, 3) and (4, 6).
m3|Is (3, 6) parallel to (1, 2)?|Yes, it's 3 times (1, 2)|No|Only if equal|Can't tell|Scalar multiples are parallel.
m3|If OP = 3a + b, what is 2OP?|6a + 2b|5a + b|6a + b|3a + 2b|Multiply each term by 2.
m3|What does it mean if PQ = 2QR?|P, Q and R are collinear (on a straight line)|They form a triangle|They are equal|Nothing|Parallel vectors sharing a point.
t2|The magnitude of a vector is always positive or zero.|T|It's a length.
`);
B("y10maths/circles", `
m1|What is the circumference formula?|C = πd|C = πr²|C = 2r|C = πr|Or C = 2πr.
m1|What is the area of a circle formula?|A = πr²|A = πd|A = 2πr|A = πd²|Square the radius.
n2|Find the area of a circle with radius 5 cm (use π = 3.14).|78.5~0.1|3.14 × 25 = 78.5 cm².
n2|Find the circumference of a circle with diameter 10 cm (π = 3.14).|31.4~0.1|3.14 × 10 = 31.4 cm.
m2|What is a chord?|A straight line joining two points on a circle|A line from centre to edge|Part of the circumference|A tangent|The diameter is the longest chord.
m2|What is a tangent?|A straight line touching a circle at one point|A chord|A radius|An arc|It is perpendicular to the radius at that point.
m2|What is an arc?|Part of the circumference|A chord|A sector|A radius|A minor arc is the shorter one.
m2|What is a sector?|A 'pizza slice' between two radii and an arc|A segment|A chord|A tangent|Area = (θ/360) × πr².
m3|The angle in a semicircle is…|90°|180°|60°|45°|An angle subtended by a diameter.
m3|The angle at the centre is ___ the angle at the circumference (same arc).|Twice|Half|Equal to|Three times|A key circle theorem.
m3|Opposite angles in a cyclic quadrilateral add up to…|180°|360°|90°|270°|All four vertices on the circle.
m3|Angles in the same segment are…|Equal|Supplementary|Complementary|Right angles|Subtended by the same chord.
m3|What is the angle between a tangent and a radius?|90°|45°|180°|60°|They are perpendicular.
n3|A sector has radius 6 cm and angle 90°. Find its area (π = 3.14).|28.26~0.05|(90/360) × 3.14 × 36 = 28.26 cm².
m3|Two tangents from an external point to a circle are…|Equal in length|Perpendicular|Parallel|Different lengths|A circle theorem.
t2|The alternate segment theorem links a tangent and chord to an angle in the opposite segment.|T|The angles are equal.
`);
B("y10maths/sequences", `
m1|What is the next term: 3, 7, 11, 15, …?|19|18|20|21|Add 4 each time.
m1|What is the term-to-term rule for 5, 10, 20, 40?|Multiply by 2|Add 5|Add 10|Multiply by 5|A geometric sequence.
m2|What is the nth term of 2, 5, 8, 11, …?|3n − 1|3n + 2|2n + 3|n + 3|Difference 3; 3 × 1 − 1 = 2.
m2|What is the nth term of 7, 11, 15, 19?|4n + 3|4n + 7|3n + 4|7n + 4|Difference 4; 4 × 1 + 3 = 7.
n2|What is the 10th term of 4n − 2?|38|4 × 10 − 2 = 38.
m2|Is 50 a term in the sequence 3n + 2?|Yes, n = 16|No|Yes, n = 50|Yes, n = 17|3n + 2 = 50 → n = 16.
m2|Which is a Fibonacci-type sequence?|1, 1, 2, 3, 5, 8|1, 2, 4, 8|2, 4, 6, 8|1, 4, 9, 16|Each term is the sum of the two before.
m2|Which are square numbers?|1, 4, 9, 16|1, 3, 6, 10|2, 4, 6, 8|1, 8, 27, 64|n².
m2|Which are triangular numbers?|1, 3, 6, 10|1, 4, 9, 16|2, 4, 8|1, 8, 27|n(n + 1)/2.
m3|What is the nth term of 2, 8, 18, 32, …?|2n²|n² + 1|4n − 2|2n + 6|Second differences are 4, so 2n².
m3|What is the nth term of 4, 7, 12, 19, …?|n² + 3|3n + 1|n² + 4|2n² + 2|Second difference 2 → n²; n² + 3.
m3|What is a geometric sequence?|Each term is multiplied by a constant ratio|A constant difference|Square numbers|Random|E.g. 3, 6, 12, 24.
n3|What is the 5th term of the geometric sequence 2, 6, 18, …?|162|Ratio 3: 18, 54, 162.
m3|The nth term is 20 − 3n. What is the first negative term?|−1|−3|0|−2|n = 7: 20 − 21 = −1.
m3|What is the 100th term of n² − n?|9900|10000|9990|990|10000 − 100.
t2|An arithmetic sequence has a constant difference.|T|E.g. +5 each time.
`);

B("y10computing/architecture", `
m1|What is RAM used for?|Holding programs and data currently in use|Permanent storage|Booting only|Printing|It is volatile.
m1|What is ROM used for?|Storing the boot-up instructions (firmware)|Running apps|Temporary data|Cache|It is non-volatile.
m2|What is an embedded system?|A computer built into a device to do a specific job|A desktop PC|A server|A laptop|E.g. a washing machine controller.
m2|What does the program counter hold?|The address of the next instruction|The current data|The result of a calculation|The clock speed|Part of the fetch stage.
m2|What is a multi-core processor?|A CPU with several processing units working in parallel|One very fast core|A graphics card|A type of RAM|More cores can run more tasks at once.
m3|What is the role of the MAR?|Holds the address of memory being read from or written to|Holds data being transferred|Counts instructions|Does calculations|Memory Address Register.
`);
})();
