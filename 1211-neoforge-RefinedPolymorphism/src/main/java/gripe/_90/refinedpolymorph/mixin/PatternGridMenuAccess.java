package gripe._90.refinedpolymorph.mixin;

import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridBlockEntity;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternGridContainerMenu;
import com.refinedmods.refinedstorage.common.autocrafting.patterngrid.PatternType;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Accessor;
import org.spongepowered.asm.mixin.gen.Invoker;

@Mixin(value = PatternGridContainerMenu.class, remap = false)
public interface PatternGridMenuAccess {
    @Accessor("patternGrid")
    PatternGridBlockEntity refinedpolymorph$getPatternGrid();

    @Invoker("getPatternType")
    PatternType refinedpolymorph$getPatternType();
}
