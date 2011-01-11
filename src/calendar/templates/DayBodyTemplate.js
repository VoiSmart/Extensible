/**
 * @class Ext.ensible.cal.DayBodyTemplate
 * @extends Ext.XTemplate
 * <p>This is the template used to render the scrolling body container used in {@link Ext.ensible.cal.DayView DayView} and 
 * {@link Ext.ensible.cal.WeekView WeekView}. This template is automatically bound to the underlying event store by the 
 * calendar components and expects records of type {@link Ext.ensible.cal.EventRecord}.</p>
 * <p>Note that this template would not normally be used directly. Instead you would use the {@link Ext.ensible.cal.DayViewTemplate}
 * that internally creates an instance of this template along with a {@link Ext.ensible.cal.DayHeaderTemplate}.</p>
 * @constructor
 * @param {Object} config The config object
 */
Ext.ensible.cal.DayBodyTemplate = function(config){
    
    Ext.apply(this, config);
    
    Ext.ensible.cal.DayBodyTemplate.superclass.constructor.call(this,
        '<table class="ext-cal-bg-tbl" cellspacing="0" cellpadding="0">',
            '<tbody>',
                '<tr height="1">',
                    '<td class="ext-cal-gutter"></td>',
                    '<td colspan="{dayCount}">',
                        '<div class="ext-cal-bg-rows">',
                            '<div class="ext-cal-bg-rows-inner">',
                                '<tpl for="times">',
                                    '<div class="ext-cal-bg-row">',
                                        '<div class="ext-cal-bg-row-div ext-row-{[xindex]}"></div>',
                                    '</div>',
                                '</tpl>',
                            '</div>',
                        '</div>',
                    '</td>',
                '</tr>',
                '<tr>',
                    '<td class="ext-cal-day-times">',
                        '<tpl for="times">',
                            '<div class="ext-cal-bg-row">',
                                '<div class="ext-cal-day-time-inner">{.}</div>',
                            '</div>',
                        '</tpl>',
                    '</td>',
                    '<tpl for="days">',
                        '<td class="ext-cal-day-col">',
                            '<div class="ext-cal-day-col-inner">',
                                '<div id="{[this.id]}-day-col-{.:date("Ymd")}" class="ext-cal-day-col-gutter"></div>',
                            '</div>',
                        '</td>',
                    '</tpl>',
                '</tr>',
            '</tbody>',
        '</table>'
    );
};

Ext.extend(Ext.ensible.cal.DayBodyTemplate, Ext.XTemplate, {
    // private
    applyTemplate : function(o){
        this.today = new Date().clearTime();
        this.dayCount = this.dayCount || 1;
        
        var i = 0, days = [],
            dt = o.viewStart.clone();
            
        for(; i<this.dayCount; i++){
            days[i] = dt.add(Date.DAY, i);
        }

        var times = [],
            start = this.viewStartHour,
            end = this.viewEndHour,
            mins = this.minTimeIncrement,
            dt = new Date().clearTime().add(Date.HOUR, start),
            fmt = Ext.ensible.Date.use24HourTime ? 'G:i' : 'ga';
        
        for(i=start; i<end; i++){
            times.push(dt.format(fmt));
            dt = dt.add(Date.MINUTE, mins);
        }
        
        return Ext.ensible.cal.DayBodyTemplate.superclass.applyTemplate.call(this, {
            days: days,
            dayCount: days.length,
            times: times
        });
    }
});

Ext.ensible.cal.DayBodyTemplate.prototype.apply = Ext.ensible.cal.DayBodyTemplate.prototype.applyTemplate;
