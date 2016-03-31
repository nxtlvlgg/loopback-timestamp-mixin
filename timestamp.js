
var DEFAULT_CREATED_NAME = "createdDate";
var DEFAULT_UPDATED_NAME = "updatedDate";


module.exports = function(Model, mixinOptions) {

    mixinOptions = mixinOptions || {};

    var createdName = mixinOptions.createdName || DEFAULT_CREATED_NAME;
    var shouldSaveCreatedDate = (mixinOptions.saveCreatedDate !== undefined)
        ? mixinOptions.saveCreatedDate : true;
    Model.defineProperty(createdName, { type: Date });

    var updatedName = mixinOptions.updatedName || DEFAULT_UPDATED_NAME;
    var shouldSaveUpdatedDate = (mixinOptions.saveUpdatedDate !== undefined)
        ? mixinOptions.saveUpdatedDate : true;
    Model.defineProperty(updatedName, { type: Date });


    Model.observe("before save", function(ctx, next) {
        saveCreatedDate(ctx);
        saveUpdatedDate(ctx);
        return next();
    });


    function saveCreatedDate(ctx) {

        if (!ctx.isNewInstance || !shouldSaveCreatedDate) {
            return;
        }

        var instance = ctx.data || ctx.instance["__data"];
        instance[createdName] = new Date();

    }

    function saveUpdatedDate(ctx) {

        if(!shouldSaveUpdatedDate) {
            return;
        }

        var instance = ctx.data || ctx.instance["__data"];
        instance[updatedName] = new Date();
    }
};


