import { DynamicPropertiesDefinition, MinecraftEntityTypes, world } from '@minecraft/server';
import { ChestFormData } from './extensions/forms.js'

world.afterEvents.itemUse.subscribe(evd => {
	if (evd.itemStack.typeId !== 'minecraft:compass') return;
	primaryMenu(evd.source);
});
function primaryMenu(player) {
	new ChestFormData()
		.title('§l§aMain Menu')
		.button(12, '§l§6Test Item 1', ['', '§r§7A testing item', 'Click any item!'], 'textures/items/magma_cream')
		.button(13, '§l§bTest Item 2', ['', '§r§7Another item', 'Click any item!'], 'textures/items/diamond', 64)
		.button(14, '§l§dTest Item 3', ['', '§r§7A third item', 'Click any item!'], 'textures/items/book_enchanted', 5)
		.show(player).then(response => {
			if (response.canceled) return;
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
			secondarymenu(player);
		})
};
function secondarymenu(player) {
	new ChestFormData('large')
		.title('§l§5Secondary Menu')
		.button(0, '§l§4Back', ['', '§r§cGo back a page!'], 'textures/blocks/barrier')
		.button(21, '§l§6Test Item 1', ['', '§r§7A testing item'], 'textures/items/magma_cream', 14)
		.button(22, '§l§nTest Item 2', ['', '§r§7Another item'], 'textures/items/stick', 4)
		.button(23, '§l§bTest Item 3', ['', '§r§7A third item'], 'textures/items/diamond_pickaxe')
		.show(player).then(response => {
			if (response.canceled) return;
			if (response.selection === 0) return primaryMenu(player);
			world.sendMessage(`${player.name} has chosen item ${response.selection}`);
		})
}
