(function ($) {
    $.fn.tabbedContent = function (options) {
        var apiUrl = 'http://content.guardianapis.com/';
        
        //it's possible to instantiate mutiple tab panel in the page    
        return this.each(function () {
            var containerHtml = this,
                tabList = $(this).find('.tabList'),
                tabPanel = $(containerHtml).find('.tabPanel');
            $(containerHtml).addClass('tabActive');
            $(tabPanel).eq(0).addClass('panelSelected');
            tabList.find('li').eq(0).addClass('tabSelected');
            tabList.click(
                function (e) {
                    return populatePanel(e.target);
                }
            );
            
            function populatePanel(tab) {
                var tabName = $(tab).attr('data-tab');
                $(tabList).find('li').removeClass('tabSelected');
                $(tabPanel).removeClass('panelSelected');
                $(tabPanel).filter('[data=panel-' + tabName + ']').addClass('panelSelected');
                $(tab).addClass('tabSelected');
                //parameters for the url should be passed as options in a real case
                $.ajax({
                    url : apiUrl + tabName + '?api-key=9wur7sdh84azzazdt3ye54k4&&show-fields=trailText&page=1&page-size=5',
                    success :  function (data) {
                        var itemContent = '<ol>';
                        data.response.results.forEach(function (element) {
                            itemContent += '<li class="newsElem"><a href="' + element.webUrl + '"><h3>' + element.webTitle + '</h3><p>' + element.fields.trailText + '</p></a></li>';
                        });

                        $(containerHtml).find('.tabPanel.panelSelected').empty().append(itemContent);
                    },
                    error : function () {
                        //default content is visibile
                    }
                });
            }
        });
    };
}(jQuery));