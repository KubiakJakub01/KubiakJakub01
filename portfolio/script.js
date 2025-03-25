/**
 * script.js: JavaScript functionality for Jakub Kubiak's NLP Engineer portfolio
 * Handles navigation, project clicks, form validation and submission
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav__list');
    const navLinks = document.querySelectorAll('.nav__link');
    const projectButtons = document.querySelectorAll('.ml-project__btn');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Initialize the page
    initNavigation();
    initProjectButtons();
    initContactForm();
    
    /**
     * Sets up mobile navigation and smooth scrolling
     */
    function initNavigation() {
        // Toggle mobile navigation
        if (navToggle) {
            navToggle.addEventListener('click', function() {
                navList.classList.toggle('active');
                
                // Toggle hamburger icon animation
                const bars = navToggle.querySelectorAll('.nav__toggle-bar');
                bars.forEach(bar => bar.classList.toggle('active'));
            });
        }
        
        // Add smooth scrolling to nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile nav if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Account for header height
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Make header sticky on scroll
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const header = document.querySelector('.header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add shadow on scroll
            if (scrollTop > 10) {
                header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    /**
     * Sets up project button click handlers
     */
    function initProjectButtons() {
        projectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectName = this.dataset.project;
                const projectMap = {
                    'vall-e': 'VALL-E X Implementation (Voice Cloning)',
                    'multilingual-asr': 'Multilingual ASR System',
                    'voicebox': 'Voicebox Implementation'
                };
                
                const projectTitle = projectMap[projectName] || 'Unknown Project';
                console.log(`Clicked on ${projectTitle} Project`);
                
                // Here you could add code to show project details in a modal
                showProjectDetails(projectName, projectTitle);
            });
        });
    }
    
    /**
     * Display project details (placeholder function)
     * @param {string} projectId - The project identifier
     * @param {string} projectTitle - The project title
     */
    function showProjectDetails(projectId, projectTitle) {
        // Project descriptions for potential modal implementation
        const projectDetails = {
            'vall-e': {
                description: 'An implementation of the VALL-E X architecture for voice cloning. This project includes custom PyTorch code with optimizations for training and inference speed.',
                achievements: [
                    'Built custom transformer implementation with flash attention',
                    'Implemented key-value caching for faster inference',
                    'Trained on large-scale audio datasets exceeding 300,000 hours',
                    'Integrated beam-search and top-k sampling techniques'
                ],
                technologies: ['PyTorch', 'Transformers', 'TTS', 'Voice Cloning']
            },
            'multilingual-asr': {
                description: 'On-device production Automatic Speech Recognition system supporting multiple European languages.',
                achievements: [
                    'Developed robust ASR for diverse European languages',
                    'Created scripts for distributed data-parallel training',
                    'Built proof of concept for multilingual speech recognition',
                    'Optimized for on-device performance'
                ],
                technologies: ['PyTorch', 'Conformer', 'ASR', 'DDP']
            },
            'voicebox': {
                description: 'Voice cloning implementation based on flow matching techniques, achieving near state-of-the-art results across multiple languages.',
                achievements: [
                    'Achieved competitive results for high, medium, and low resource languages',
                    'Scaled to support over 30 languages',
                    'Implemented flow matching for high-quality voice synthesis',
                    'Optimized training and inference pipelines'
                ],
                technologies: ['PyTorch', 'Flow Matching', 'TTS', 'Multilingual']
            }
        };
        
        // For now, just logging to console
        console.log(`Showing details for: ${projectTitle} (${projectId})`);
        
        // In a real implementation, you would display this information in a modal
        if (projectDetails[projectId]) {
            console.log('Project details:', projectDetails[projectId]);
        }
    }
    
    /**
     * Sets up contact form validation and submission
     */
    function initContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const projectType = document.getElementById('projectType').value;
                const message = document.getElementById('message').value.trim();
                
                // Validate form
                if (!validateForm(name, email, projectType, message)) {
                    return false;
                }
                
                // Form data object
                const formData = {
                    name,
                    email,
                    projectType,
                    message,
                    timestamp: new Date().toISOString()
                };
                
                // Log form data to console (in a real app, you would send this to a server)
                console.log('Form submitted successfully with data:', formData);
                
                // Show success message
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            });
        }
    }
    
    /**
     * Validates the contact form
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} projectType - Selected project type
     * @param {string} message - User's message
     * @returns {boolean} - Whether the form is valid
     */
    function validateForm(name, email, projectType, message) {
        // Reset previous error message
        showFormMessage('', '');
        
        // Validate name
        if (name === '') {
            showFormMessage('Please enter your name', 'error');
            return false;
        }
        
        // Validate email
        if (email === '' || !isValidEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return false;
        }
        
        // Validate project type
        if (projectType === '') {
            showFormMessage('Please select a project type', 'error');
            return false;
        }
        
        // Validate message
        if (message === '') {
            showFormMessage('Please enter your message', 'error');
            return false;
        }
        
        return true;
    }
    
    /**
     * Checks if an email is valid
     * @param {string} email - The email to validate
     * @returns {boolean} - Whether the email is valid
     */
    function isValidEmail(email) {
        // Basic email validation (contains @ and at least one dot after @)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    /**
     * Displays a form message to the user
     * @param {string} message - The message to display
     * @param {string} type - The message type ('error' or 'success')
     */
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form__message';
            
            if (type) {
                formMessage.classList.add(type);
            }
        }
    }
}); 