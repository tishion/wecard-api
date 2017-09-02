const Foo = sequelize.define('foo', {
    id: {
        type: Sequelize.UUID, 
        allowNull: false
    },
    cardcase_id: {
        type: Sequelize.UUID, 
        allowNull: false
    }
});