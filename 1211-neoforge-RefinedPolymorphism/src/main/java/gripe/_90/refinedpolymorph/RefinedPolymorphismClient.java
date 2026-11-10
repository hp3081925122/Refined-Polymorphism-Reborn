package gripe._90.refinedpolymorph;

import com.illusivesoulworks.polymorph.api.client.PolymorphWidgets;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridScreen;
import com.refinedmods.refinedstorage.common.grid.screen.CraftingGridScreen;
import net.minecraft.world.inventory.ResultContainer;
import net.minecraft.world.inventory.Slot;

public final class RefinedPolymorphismClient {
    private RefinedPolymorphismClient() {
    }

    public static void registerWidget() {
        PolymorphWidgets widgets = PolymorphWidgets.getInstance();
        widgets.registerWidget(screen -> {
            if (!(screen instanceof CraftingGridScreen) && !(screen instanceof PatternGridScreen)) {
                return null;
            }
            Slot output = findActiveResultSlot(screen);
            if (output == null) {
                return null;
            }
            return new GridRecipeWidget(screen, output);
        });
    }

    static Slot findActiveResultSlot(net.minecraft.client.gui.screens.inventory.AbstractContainerScreen<?> screen) {
        Slot fallback = null;
        for (Slot slot : screen.getMenu().slots) {
            if (slot.container instanceof ResultContainer) {
                if (slot.isActive()) {
                    return slot;
                }
                if (fallback == null) {
                    fallback = slot;
                }
            }
        }
        return fallback;
    }
}
