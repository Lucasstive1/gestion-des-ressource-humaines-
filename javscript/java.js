// Initialisation AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Animation du compteur
$('.counter').counterUp({
    delay: 10,
    time: 2000
});

// Navbar scroll effect
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.navbar').addClass('scrolled');
    } else {
        $('.navbar').removeClass('scrolled');
    }
});

// Smooth scrolling pour les ancres
$('a[href*="#"]').on('click', function(e) {
    e.preventDefault();
    
    $('html, body').animate(
        {
            scrollTop: $($(this).attr('href')).offset().top,
        },
        500,
        'linear'
    );
});

// Animation au chargement
$(document).ready(function() {
    setTimeout(function() {
        $('.hero h1').addClass('animate__animated animate__fadeInDown');
        $('.hero p').addClass('animate__animated animate__fadeInUp');
        $('.btn-hero').addClass('animate__animated animate__fadeInUp');
    }, 300);
});













$(document).ready(function () {
    // Animation des boutons
    $('.btn-action').hover(
        function () {
            $(this).css('transform', 'translateY(-3px)');
        },
        function () {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Gestion du filtre
    $('#filterStatus').change(function () {
        const status = $(this).val();
        $('.session-row').hide();

        if (status === 'all') {
            $('.session-row').show();
        } else {
            $(`.session-row[data-status="${status}"]`).show();
        }
    });

    // Recherche
    $('#searchInput').keyup(function () {
        const searchText = $(this).val().toLowerCase();

        $('.session-row').each(function () {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.includes(searchText));
        });
    });

    // Démarrer une session
    $('.btn-start').click(function () {
        $('#startSessionModal').modal('show');
    });

    // Terminer une session
    $('.btn-complete').click(function () {
        $('#completeSessionModal').modal('show');
    });

    // Annuler une session
    $('.btn-cancel').click(function () {
        if (confirm('Êtes-vous sûr de vouloir annuler cette session ?')) {
            const row = $(this).closest('tr');
            row.find('.status-badge')
                .removeClass('status-pending')
                .addClass('status-canceled')
                .text('Annulé');

            row.find('.btn-start, .btn-complete, .btn-cancel').prop('disabled', true);
            $(this).removeClass('pulse-animation');

            // Ici vous pourriez ajouter une requête AJAX pour sauvegarder l'état
        }
    });

    // Upload d'image pour le début de session
    $('#uploadStartProof').click(function () {
        $('#startProofInput').click();
    });

    $('#startProofInput').change(function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                $('#startProofPreview').attr('src', event.target.result).show();
            }
            reader.readAsDataURL(file);
        }
    });

    // Upload multiple pour la fin de session
    $('#uploadEndProof').click(function () {
        $('#endProofInput').click();
    });

    $('#endProofInput').change(function (e) {
        const files = e.target.files;
        $('#endProofPreviews').empty();

        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function (event) {
                $('#endProofPreviews').append(`
                    <img src="${event.target.result}" class="img-thumbnail" style="width: 100px; height: 100px; object-fit: cover;">
                `);
            }
            reader.readAsDataURL(files[i]);
        }
    });

    // Confirmer le début de session
    $('#confirmStartBtn').click(function () {
        // Validation
        if (!$('#actualStartTime').val()) {
            alert('Veuillez indiquer l\'heure de début');
            return;
        }

        // Ici vous pourriez ajouter une requête AJAX pour sauvegarder

        // Mise à jour de l'interface
        const row = $('.btn-start.pulse-animation').closest('tr');
        row.find('.status-badge')
            .removeClass('status-pending')
            .addClass('status-in-progress')
            .text('En cours');

        row.find('.btn-start').removeClass('pulse-animation').prop('disabled', true);
        row.find('.btn-complete').prop('disabled', false).addClass('pulse-animation');

        $('#startSessionModal').modal('hide');
        alert('Session démarrée avec succès !');
    });

    // Confirmer la fin de session
    $('#confirmCompleteBtn').click(function () {
        // Validation
        if (!$('#actualEndTime').val()) {
            alert('Veuillez indiquer l\'heure de fin');
            return;
        }

        // Ici vous pourriez ajouter une requête AJAX pour sauvegarder

        // Mise à jour de l'interface
        const row = $('.btn-complete.pulse-animation').closest('tr');
        row.find('.status-badge')
            .removeClass('status-in-progress')
            .addClass('status-completed')
            .text('Terminé');

        row.find('.btn-complete').removeClass('pulse-animation').prop('disabled', true);

        $('#completeSessionModal').modal('hide');
        alert('Session terminée avec succès !');
    });
});