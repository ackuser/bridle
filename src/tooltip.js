/*****
 * Really simple tooltip implementation, stolen from nvtooltip
 *****/

Bridle.tooltip = {

  show : function(pos, content, gravity, dist) {
    var container = $('<div class="bridle tooltip">');

    gravity = gravity || 's';
    dist = dist || 20;

    // attach to the parent of the main bridle div
    var bridleContainer = $('svg.bridle').closest('div').get(0);

    container
      .html(content)
      .css({left : -1000, top : -1000, opacity : 0})
      .appendTo(bridleContainer);

    var height =
        container.height() + parseInt(container.css('padding-top')) + parseInt(container.css('padding-bottom')),
      width = container.width() + parseInt(container.css('padding-left')) + parseInt(container.css('padding-right')),
      windowWidth = $(window).width(),
      windowHeight = $(window).height(),
      scrollTop = $('body').scrollTop(),  //TODO: also adjust horizontal scroll
      left, top;

    //TODO: implement other gravities
    switch (gravity) {
      case 'e':
      case 'w':
      case 'n':
        left = pos[0] - (width / 2);
        top = pos[1] + dist;
        if (left < 0) {
          left = 5;
        }
        if (left + width > windowWidth) {
          left = windowWidth - width - 5;
        }
        if (scrollTop + windowHeight < top + height) {
          top = pos[1] - height - dist;
        }
        break;
      case 's':
        left = pos[0] - (width / 2);
        top = pos[1] - height - dist;
        if (left < 0) {
          left = 5;
        }
        if (left + width > windowWidth) {
          left = windowWidth - width - 5;
        }
        if (scrollTop > top) {
          top = pos[1] + dist;
        }

        break;
    }

    container
      .css({
        left    : left,
        top     : top,
        opacity : 1
      });
  },

  cleanup : function() {
    var tooltips = $('.bridle.tooltip');

    // remove right away, but delay the show with css
    tooltips.css({
      'transition-delay'         : '0 !important',
      '-moz-transition-delay'    : '0 !important',
      '-webkit-transition-delay' : '0 !important'
    });

    tooltips.css('opacity', 0);

    setTimeout(function() {
      tooltips.remove();
    }, 500);
  }

};
