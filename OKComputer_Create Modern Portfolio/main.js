// Portfolio Website Main JavaScript
// Advanced interactions and animations

// Global variables
let particles = [];
let particleSystem;
let skillsChart;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticleSystem();
    initSkillsChart();
    initScrollAnimations();
    initTimelineAnimations();
    initCodeDemo();
    initNavigation();
});

// Particle System for Hero Background
function initParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    // Create canvas element
    const canvasElement = document.createElement('canvas');
    canvasElement.style.position = 'absolute';
    canvasElement.style.top = '0';
    canvasElement.style.left = '0';
    canvasElement.style.width = '100%';
    canvasElement.style.height = '100%';
    canvasElement.style.zIndex = '-1';
    canvas.appendChild(canvasElement);
    
    const ctx = canvasElement.getContext('2d');
    
    function resizeCanvas() {
        canvasElement.width = canvas.offsetWidth;
        canvasElement.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvasElement.width;
            this.y = Math.random() * canvasElement.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvasElement.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvasElement.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(74, 155, 142, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(74, 155, 142, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Skills Chart Initialization
function initSkillsChart() {
    const chartElement = document.getElementById('skills-chart');
    if (!chartElement) return;
    
    skillsChart = echarts.init(chartElement);
    
    const option = {
        backgroundColor: 'transparent',
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 31, 54, 0.9)',
            borderColor: '#4a9b8e',
            textStyle: {
                color: '#ffffff'
            }
        },
        legend: {
            data: ['Programming', 'Data Science', 'Research'],
            textStyle: {
                color: '#ffffff'
            },
            top: 20
        },
        radar: {
            indicator: [
                { name: 'Python', max: 100 },
                { name: 'Swift/iOS', max: 100 },
                { name: 'JavaScript', max: 100 },
                { name: 'R/Statistics', max: 100 },
                { name: 'Machine Learning', max: 100 },
                { name: 'Data Visualization', max: 100 },
                { name: 'Research Methods', max: 100 },
                { name: 'GIS/Spatial', max: 100 }
            ],
            shape: 'polygon',
            splitNumber: 4,
            axisName: {
                color: '#ffffff',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(74, 155, 142, 0.3)'
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(74, 155, 142, 0.5)'
                }
            }
        },
        series: [{
            name: 'Skills Overview',
            type: 'radar',
            data: [
                {
                    value: [90, 85, 80, 85, 75, 80, 90, 70],
                    name: 'Current Level',
                    areaStyle: {
                        color: 'rgba(74, 155, 142, 0.3)'
                    },
                    lineStyle: {
                        color: '#4a9b8e',
                        width: 2
                    },
                    itemStyle: {
                        color: '#4a9b8e'
                    }
                }
            ]
        }]
    };
    
    skillsChart.setOption(option);
    
    // Responsive chart
    window.addEventListener('resize', function() {
        skillsChart.resize();
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate skill cards with stagger
                if (entry.target.classList.contains('skill-card')) {
                    const cards = document.querySelectorAll('.skill-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            anime({
                                targets: card,
                                translateY: [50, 0],
                                opacity: [0, 1],
                                duration: 600,
                                easing: 'easeOutQuart'
                            });
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.timeline-item, .skill-card').forEach(el => {
        observer.observe(el);
    });
}

// Timeline Animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateX: [50, 0],
                    opacity: [0, 1],
                    duration: 800,
                    easing: 'easeOutQuart'
                });
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Code Demo Functionality
function initCodeDemo() {
    const codeContent = document.getElementById('code-content');
    if (!codeContent) return;
    
    // Animate code typing effect
    function typeCode() {
        const code = codeContent.textContent;
        codeContent.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < code.length) {
                codeContent.textContent += code.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 20);
    }
    
    // Trigger typing animation when code section is visible
    const codeSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeCode, 500);
                codeSectionObserver.unobserve(entry.target);
            }
        });
    });
    
    const codeSection = document.querySelector('.code-editor');
    if (codeSection) {
        codeSectionObserver.observe(codeSection);
    }
}

// Navigation Functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navigation background on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('bg-navy/90');
            nav.classList.remove('bg-navy/80');
        } else {
            nav.classList.add('bg-navy/80');
            nav.classList.remove('bg-navy/90');
        }
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function runCodeDemo() {
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Running...';
    button.disabled = true;
    
    // Simulate code execution
    setTimeout(() => {
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-teal/20 border border-teal text-teal px-4 py-3 rounded-lg mt-4';
        successDiv.innerHTML = `
            <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                Analysis completed successfully!
            </div>
        `;
        
        button.parentNode.appendChild(successDiv);
        
        // Animate the success message
        anime({
            targets: successDiv,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 500,
            easing: 'easeOutQuart'
        });
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            anime({
                targets: successDiv,
                translateY: [0, -20],
                opacity: [1, 0],
                duration: 500,
                easing: 'easeInQuart',
                complete: () => {
                    successDiv.remove();
                }
            });
        }, 3000);
        
    }, 2000);
}

// Skill Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateX: 5,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Text Animation Effects
function initTextAnimations() {
    const gradientTexts = document.querySelectorAll('.gradient-text');
    
    gradientTexts.forEach(text => {
        // Add subtle glow animation
        anime({
            targets: text,
            textShadow: [
                '0 0 5px rgba(74, 155, 142, 0.5)',
                '0 0 20px rgba(74, 155, 142, 0.8)',
                '0 0 5px rgba(74, 155, 142, 0.5)'
            ],
            duration: 3000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });
    });
}

// Initialize text animations
document.addEventListener('DOMContentLoaded', initTextAnimations);

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Add click handlers for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Initialize everything with error handling
document.addEventListener('DOMContentLoaded', function() {
    try {
        initParticleSystem();
        initSkillsChart();
        initScrollAnimations();
        initTimelineAnimations();
        initCodeDemo();
        initNavigation();
        initTextAnimations();
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Export functions for external use
window.PortfolioJS = {
    scrollToSection,
    runCodeDemo,
    toggleMobileMenu
};