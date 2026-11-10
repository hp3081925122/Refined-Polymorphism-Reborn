package gripe._90.refinedpolymorph;

import javax.annotation.Nullable;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.crafting.RecipeHolder;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;

public interface RecipeMatrixHooks {
    void refinedpolymorph$bindBlockEntity(BlockEntity blockEntity);

    void refinedpolymorph$bindPlayer(Player player);

    @Nullable
    RecipeHolder<?> refinedpolymorph$getCurrentRecipe();

    void refinedpolymorph$invalidateAndUpdate(Level level);
}
