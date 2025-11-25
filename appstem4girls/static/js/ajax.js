// static/js/ajax-search.js
(function($){
  $(function(){
    var $input = $('#live-search-input');
    var $box = $('#live-search-results');
    var timer = null;
    var DEBOUNCE = 280;

    function escapeHtml(s){
      return String(s || '').replace(/[&<>"']/g, function(m){
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];
      });
    }

    function renderResults(data){
      var html = '';
      if ((data.recursos && data.recursos.length) || (data.proveedores && data.proveedores.length)){
        if (data.recursos && data.recursos.length){
          html += '<div class="rs-section"><strong>{0}</strong><ul>'.replace('{0}','Recursos');
          $.each(data.recursos, function(i, r){
            html += '<li class="rs-item rs-recurso"><a href="'+ escapeHtml(r.url) +'">'+ escapeHtml(r.titulo) +'</a></li>';
          });
          html += '</ul></div>';
        }
        if (data.proveedores && data.proveedores.length){
          html += '<div class="rs-section"><strong>{0}</strong><ul>'.replace('{0}','Proveedores');
          $.each(data.proveedores, function(i, p){
            html += '<li class="rs-item rs-proveedor"><a href="'+ escapeHtml(p.url) +'">'+ escapeHtml(p.nombre) +'</a></li>';
          });
          html += '</ul></div>';
        }
      } else {
        html = '<div class="rs-empty">No hay resultados</div>';
      }
      $box.html(html);
      $box.show();
    }

    function doSearch(q){
      if (!q) {
        $box.empty().hide();
        return;
      }
      $.ajax({
        url: '/appstem4girls/ajax/search/',
        method: 'GET',
        data: { q: q },
        dataType: 'json'
      }).done(function(data){
        renderResults(data || {});
      }).fail(function(){
        $box.html('<div class="rs-empty">Error al buscar</div>').show();
      });
    }

    $input.on('input', function(){
      clearTimeout(timer);
      var q = $(this).val().trim();
      timer = setTimeout(function(){ doSearch(q); }, DEBOUNCE);
    });

    // cerrar resultados al hacer click fuera
    $(document).on('click', function(e){
      if (!$(e.target).closest('.search_box').length){
        $box.empty().hide();
      }
    });

    // Navegación con teclado (simple)
    $input.on('keydown', function(e){
      var $items = $box.find('.rs-item a');
      if (!$items.length) return;
      var $focused = $items.filter('.focused');
      if (e.key === 'ArrowDown'){
        e.preventDefault();
        if (!$focused.length) { $items.first().addClass('focused').focus(); }
        else { var $next = $focused.parent().next().find('a'); if ($next.length){ $focused.removeClass('focused'); $next.addClass('focused').focus(); } }
      } else if (e.key === 'ArrowUp'){
        e.preventDefault();
        if ($focused.length){ var $prev = $focused.parent().prev().find('a'); if ($prev.length){ $focused.removeClass('focused'); $prev.addClass('focused').focus(); } }
      }
    });

  });
})(jQuery);
